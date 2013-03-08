/***********************************
DRAWING FUNCTIONS
***********************************/
var lineSegmentsArray = {};
var SEGMENT_TOTAL_WIDTH;


function getLineSize(allNodes){
	var currentSmallestNode = Number.MAX_VALUE;
	for (n in allNodes){
		if (allNodes[n].size < currentSmallestNode){
			currentSmallestNode = allNodes[n].size;
		}
	}
	return currentSmallestNode;
}

//data is an array of lines
//each line is an array of nodes
function draw(allLines, layer){

	for (line in allLines){
		var thisLine = allLines[line];
		
		totalNodeSize = 0;
		for (node in thisLine){
			totalNodeSize += thisLine[node].size;
		}
		averageNodeSize = totalNodeSize/(thisLine.length);
		
		initializeLineSegmentsArray(allLines);
		drawLines(allLines);
	}
	
	drawNode(allLines, drawNodeBases);
	drawNode(allLines, drawNodeShared);
	
	if (layer == LOWEST_LAYER){
		layer.setOpacity(0);
	}
	
	stage.add(layer);
}


/***********************************
DRAW NODES
***********************************/


function drawNode(data, fun){
	for (line in data){
		var thisLine = data[line];
		
		totalNodeSize = 0;
		for (node in thisLine){
			totalNodeSize += thisLine[node].size;
		}
		averageNodeSize = totalNodeSize/(thisLine.length);
		
		for (node in thisLine){
			fun(thisLine[node], averageNodeSize, thisLine);
		} 
	}

}

function drawNodeBases(node, averageNodeSize, line){
	var color = getColor(node.lines);
		
		var circle = new Kinetic.Circle({
			x: node.x,
			y: node.y,
			radius: node.size,
			stroke: color,
			fill: '#FFFFFF',
			strokeWidth: averageNodeSize/4
		});
	
		var circleCaption = new Kinetic.Text({
			x: node.x - (node.size)/2,
			y: node.y - (node.size)/2,
			text: node.caption,
			width: node.size,
			fontSize: (node.size)/4,
			fontFamily: 'Calibri',
			textFill: 'black',
			align: 'center'
		});
	
		// Logic to show/hide article menu when clicking the nodes
		// in the lowest layer
		if (node.layer == LOWEST_LAYER_NUM){
			circle.on('click', function() {
				if ((circle.getParent()).getOpacity() >= 0.5){
					toggleArticleMenu(circle, node.articles);
				}
			});
	
			circleCaption.on('click', function() {
				if ((circle.getParent()).getOpacity() >= 0.5){
					toggleArticleMenu(circle, node.articles);
				}
			});
		}
		
		addToLayer(circle, (node.layer));
		addToLayer(circleCaption, (node.layer)); 
		
}

function drawNodeShared(node, averageNodeSize, line){
	
	// SHARED NODE, ONLY DRAW A PARTIAL ARC
	if ((node.lines).length > 1){
	
		var color = getColor(getLineNumber(line));
		
		var myIndex = line.indexOf(node);
		//NEED TO ADD STUFF IN CASE THE SHARED NODE IS FIRST OR LAST
		
		var point1 = (line[myIndex-1] == undefined) ? 
									{x: line[myIndex].x - 100, y: line[myIndex].y} : 
									{x: line[myIndex-1].x, y: line[myIndex-1].y};
		var centerPoint = {x: node.x, y: node.y};
		var point2 = (line[myIndex+1] == undefined) ?
								{x: line[myIndex].x + 100, y: line[myIndex].y} :
								{x: line[myIndex+1].x, y: line[myIndex+1].y};
		
		var vector1 = {x: point1.x - centerPoint.x, y: point1.y - centerPoint.y};
		var vector2 = {x: point2.x - centerPoint.x, y: point2.y - centerPoint.y};
		var angle1 = Math.atan(vector1.y / vector1.x);
		var angle2 = Math.atan(vector2.y / vector2.x);
		
		// ACCOMMODATING NASTY TRIG GARBAGE
		if (angle1 > 0 && vector1.y < 0){
			angle1 = angle1 - Math.PI;
		}
		if (angle1 < 0 && vector1.y > 0) {
			angle1 = angle1 + Math.PI;
		} 
		if (angle2 > 0 && vector2.y < 0){
			angle2 = angle2 - Math.PI;
		}
		if (angle2 < 0 && vector2.y > 0) {
			angle2 = angle2 + Math.PI;
		} 
		var arc = new Kinetic.Shape({
			drawFunc: function(canvas) {
				var context = canvas.getContext();
				var x = node.x;
				var y = node.y;
				var radius = node.size;
				var startAngle = angle1;
				var endAngle =  angle2;
				var counterClockwise = getDirection(angle1, angle2);
				context.beginPath();
				context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
				context.lineWidth = averageNodeSize/4;
				context.strokeStyle = color;
				context.stroke();
			}
		});

		addToLayer(arc, node.layer);
	}
}

// Takes in two angles, figure out which direction will create the smaller arc
// return true if counterclockwise, return false if clockwise
function getDirection(startAngle, endAngle){

	var startAngleMod = startAngle % (2 * Math.PI);
	var endAngleMod = endAngle % (2 * Math.PI);
	var diffAngle = Math.max(startAngleMod, endAngleMod) - Math.min(startAngleMod, endAngleMod);

	if (startAngleMod > endAngleMod){
		if (diffAngle < Math.PI){
			console.log("clockwise");
			return true;
		}
		else{
			console.log("counterclockwise");
			return false;
		}
	}
	else if (startAngleMod < endAngleMod){
		if (diffAngle < Math.PI){
			console.log("counterclockwise");
			return false;
		}
		else{
			console.log("clockwise");
			return true;
		}
	}
	else{
		//PROBLEM
	}
}
/*
console.log(getDirection(3*Math.PI/4, Math.PI/4));
console.log(getDirection(Math.PI/4, 3*Math.PI/4));
console.log(getDirection(5*Math.PI/4, 7*Math.PI/4));
console.log(getDirection(7*Math.PI/4, 5*Math.PI/4));
*/
/***********************************
DRAW LINES
***********************************/

function initializeLineSegmentsArray(allLines){
	for (line in allLines){
		var thisLine = allLines[line];
		for (node in thisLine){
			var index = parseInt(node);
			if (node != (thisLine.length - 1)){
				var thisSegment = thisLine[index].id + ", " + thisLine[index+1].id;
				lineSegmentsArray[thisSegment] = [];
			}
		}
	}
	
	for (line in allLines){
		var thisLine = allLines[line];
		for (node in thisLine){
			var index = parseInt(node);
			if (node != (thisLine.length - 1)){
				var thisSegment = thisLine[index].id + ", " + thisLine[index+1].id;
				lineSegmentsArray[thisSegment].push(line);
			}
		}
	}
	//console.log(lineSegmentsArray);
}

//allLines is an array of lines
// lines are arrays of nodes
function drawLines(allLines){
	
	for (line in allLines){
		var thisLine = allLines[line];
		var color = getColor(line);
		
		for (node in thisLine){
			var nodeIndex = parseInt(node);
			if (node != (thisLine.length - 1)){
				var thisSegment = thisLine[nodeIndex].id + ", " + thisLine[nodeIndex+1].id;
				var thisSegmentData = [thisLine[nodeIndex], thisLine[nodeIndex+1]];
				var thisSegmentWidth = SEGMENT_TOTAL_WIDTH;
				
				//multiple lines in this segment, make width smaller and calculate offset for rainbow
				if (lineSegmentsArray[thisSegment].length > 1){
					thisSegmentWidth = SEGMENT_TOTAL_WIDTH/(lineSegmentsArray[thisSegment].length);
					
					//offset the start and end points
					var perpSlope = (-1) * ((thisSegmentData[0].x - thisSegmentData[1].x)/
													(thisSegmentData[0].y - thisSegmentData[1].y));
					
					var basePointStart = offsetPoint(thisLine[nodeIndex], SEGMENT_TOTAL_WIDTH/2, perpSlope, true);
					var basePointEnd = offsetPoint(thisLine[nodeIndex+1], SEGMENT_TOTAL_WIDTH/2, perpSlope, true);
					
					var offsetStart = offsetPoint(basePointStart, (thisSegmentWidth * (parseInt(line)+1)), perpSlope, false)
					var offsetEnd = offsetPoint(basePointEnd, (thisSegmentWidth * (parseInt(line)+1)), perpSlope, false)
					
					var thisPointStart = offsetPoint(offsetStart, thisSegmentWidth/2, perpSlope, true);
					var thisPointEnd = offsetPoint(offsetEnd, thisSegmentWidth/2, perpSlope, true);
					
					thisSegmentData = [thisPointStart, thisPointEnd];
				}
				
				var draw = new Kinetic.Line({
					points: thisSegmentData,
					stroke: color,
					strokeWidth: thisSegmentWidth,
					lineCap: 'round',
					lineJoin: 'round'
				});
				
				addToLayer(draw, thisLine[0].layer);
			}
		}
	}
}

function offsetPoint(originalPoint, distance, slope, isMoveDown){
	//console.log(distance + ", " + isMoveDown);
	if (slope == undefined){
		console.log("slope is undefined");
	}
	
	var xOffset = Math.sqrt((distance * distance)/(slope * slope + 1));
	var yOffset = slope * xOffset;
	if (isMoveDown){
		xOffset = xOffset * -1;
		yOffset = yOffset * -1;
	}
	var newPoint = {x: originalPoint.x + xOffset, y: originalPoint.y + yOffset};
	return newPoint;
}

/*
console.log(offsetPoint({x:0, y:0}, Math.sqrt(2), 1, true));
console.log(offsetPoint({x:0, y:0}, Math.sqrt(2), 1, false));
console.log(offsetPoint({x:0, y:0}, 2, Math.sqrt(3), true));
console.log(offsetPoint({x:0, y:0}, 2, Math.sqrt(3), false));
*/