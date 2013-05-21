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

//data is an array of all nodes
//allLines is an array of lines, each line is an array of nodes
function draw(data, allLines){

	//draw the line segments
	initializeLineSegmentsArray(allLines);
	drawLines(allLines);
	
	//find the average node size, later used in calculating stroke width
	var averageNodeSize = 0;
	for (line in allLines){
		var thisLine = allLines[line];
		
		totalNodeSize = 0;
		for (node in thisLine){
			totalNodeSize += thisLine[node].size;
		}
		averageNodeSize = totalNodeSize/(thisLine.length);
	}
	
	/*drawNode(allLines, drawNodeBases);
	drawNode(allLines, drawNodeShared);
	*/
	
	//draw the nodes
	//console.log(data);
	for (node in data){
		drawPlainNode(data[node], averageNodeSize);
		if ((data[node].lines).length > 1){
			//console.log(data[node]);
			drawSharedNode(data[node], averageNodeSize, allLines);
		}
	}
}


/***********************************
DRAW NODES
***********************************/

//Plain node, only part of one metro line, one color
function drawPlainNode(node, averageNodeSize){
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
	/*if (node.layer == LOWEST_LAYER_NUM){
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
	*/
	addToLayer(circle, (node.layer));
	addToLayer(circleCaption, (node.layer)); 
}


function drawSharedNode(node, averageNodeSize, allLines){
	//console.log("DRAW SHARED NODE");
	
	var allArcs = [];
	
	for (line in node.lines){
		var color = getColor(parseInt(line));
		
		//console.log("NEIGHBOR -1: " + getNeighborNode(node, allLines[line], -1));
		//console.log("NEIGHBOR 1: " + getNeighborNode(node, allLines[line], 1));
		var point1 = (getNeighborNode(node, allLines[line], -1) == null) ? 
									{x: node.x - 100, y: node.y} : 
									{x: getNeighborNode(node, allLines[line], -1).x, 
										y: getNeighborNode(node, allLines[line], -1).y};
		var centerPoint = {x: node.x, y: node.y};
		var point2 = (getNeighborNode(node, allLines[line], 1) == null) ?
								{x: node.x + 100, y: node.y} :
								{x: getNeighborNode(node, allLines[line], 1).x, 
									y: getNeighborNode(node, allLines[line], 1).y};
		
		
		var vector1 = {x: point1.x - centerPoint.x, y: point1.y - centerPoint.y};
		var vector2 = {x: point2.x - centerPoint.x, y: point2.y - centerPoint.y};
		var angle1 = Math.atan(vector1.y / vector1.x);
		var angle2 = Math.atan(vector2.y / vector2.x);
		
		// ACCOMMODATING NASTY TRIG GARBAGE
		// Is it the shitty coordinate system?
		if (vector1.x < 0) {
			angle1 = angle1 + Math.PI;
		}
		if (vector2.x < 0) {
			angle2 = angle2 + Math.PI;
		}
		
		var obj = {color: color, node: node, angle1: angle1, 
								angle2: angle2, averageNodeSize: averageNodeSize, size: getArcSize(angle1, angle2)};
		allArcs.push(obj);
	}
	
	//sort the arcs from largest angle to smallest angle
	//draw entire circle for largest angle
	//layer all other angles on top (from largest to smallest angle)
	var allSortedArcs = allArcs.sort(function(a,b){
		return (b.size - a.size);
	});
	
	for (arc in allSortedArcs){
		//largest angled arc, draw entire circle
		if (arc == 0){
			var circle = new Kinetic.Circle({
				x: allSortedArcs[arc].node.x,
				y: allSortedArcs[arc].node.y,
				radius: allSortedArcs[arc].node.size,
				stroke: allSortedArcs[arc].color,
				strokeWidth: allSortedArcs[arc].averageNodeSize/4
			});
			addToLayer(circle, (node.layer));
		}
		
		drawArcs(allSortedArcs[arc].color, allSortedArcs[arc].node, 
						allSortedArcs[arc].angle1, allSortedArcs[arc].angle2, 
						allSortedArcs[arc].averageNodeSize);
	}
}

function drawArcs(color, node, angle1, angle2, averageNodeSize){
	var arc = new Kinetic.Shape({
		drawFunc: function(canvas) {
			//console.log(angle1 + ", " + angle2);
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

function getNeighborNode(node, line, beforeOrAfter){
	for (n in line){
		if (line[n] == node){
			if (((parseInt(n) + beforeOrAfter) >= 0) && ((parseInt(n) + beforeOrAfter) < line.length)){
				return line[(parseInt(n) + beforeOrAfter)];
			}
		}
	}
	return null;
}

// Takes in two angles, figure out which direction will create the smaller arc
function getDirection(startAngle, endAngle){

	var startAngleMod = startAngle % (2 * Math.PI);
	var endAngleMod = endAngle % (2 * Math.PI);
	var diffAngle = Math.max(startAngleMod, endAngleMod) - Math.min(startAngleMod, endAngleMod);

	if (startAngleMod > endAngleMod){
		if (diffAngle < Math.PI){
			return true;
		}
		else{
			return false;
		}
	}
	else if (startAngleMod < endAngleMod){
		if (diffAngle < Math.PI){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		//PROBLEM
	}
}

function getArcSize(startAngle, endAngle){

	var startAngleMod = startAngle % (2 * Math.PI);
	var endAngleMod = endAngle % (2 * Math.PI);
	var diffAngle = Math.max(startAngleMod, endAngleMod) - Math.min(startAngleMod, endAngleMod);
	if (diffAngle > Math.PI){
		diffAngle = (2 * Math.PI) - diffAngle;
	}
	return diffAngle;
}

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