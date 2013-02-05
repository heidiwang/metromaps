/***********************************
DRAWING FUNCTIONS
***********************************/
var lineSegmentsArray = {};
var SEGMENT_TOTAL_WIDTH;

function draw(lines, nodes){
	drawTimeTicks(nodes);
	initializeLineSegments(lines);
	drawLines(lines);
	drawNodes(nodes, lines);
	drawLegend(lines);
}

/***********************************
DRAW TIME TICKS
***********************************/

function drawTimeTicks(nodes) {
	var datesDictionary = {};
	var ticks = [];
	for (var n in nodes) {
		var date = nodes[n].date;
		var splitDate = date.split("-");
		var shortDate = splitDate[0] + "/" + splitDate[2];
		if (datesDictionary[shortDate] == null) {
			datesDictionary[shortDate] = true;
			ticks.push(nodes[n]);
		}
	}
	
	for (var t in ticks) {
		var startPoint = {x: ticks[t].x, y: 0};
		var endPoint = {x: ticks[t].x, y: 10};
		var tick = new Kinetic.Line({
			points: [startPoint, endPoint],
			stroke: "black"
		});
		
		var date = ticks[t].date;
		var splitDate = date.split("-");
		var shortDate = splitDate[0] + "/" + splitDate[2];
		var label = new Kinetic.Text({
			x: ticks[t].x - (CANVAS_WIDTH/NUM_NODES)/2,
			y: 15,
			width: CANVAS_WIDTH/NUM_NODES,
			text: shortDate,
			fontSize: 9,
			fontFamily: 'Calibri',
			textFill: 'black',
			align: 'center'
		});
		
		tickLayer.add(tick);
		tickLayer.add(label);
	}
}

/***********************************
DRAW LINES
***********************************/

function initializeLineSegments(lines){
	for (var l in lines){
		var thisLinesNodes = lines[l].nodes;
		for (var n in thisLinesNodes){
			if (n != (thisLinesNodes.length - 1)){	//skip the last node bc it doesn't have a segment
				var start = thisLinesNodes[n].id;
				var end = thisLinesNodes[(parseInt(n))+1].id;
				var thisSegment = start + ", " + end;
				lineSegmentsArray[thisSegment] = [];
			}
		}
	}
	
	for (var l in lines){
		var thisLinesNodes = lines[l].nodes;
		for (var n in thisLinesNodes){
			if (n != (thisLinesNodes.length - 1)){	//skip the last node bc it doesn't have a segment
				var start = thisLinesNodes[n].id;
				var end = thisLinesNodes[(parseInt(n))+1].id;
				var thisSegment = start + ", " + end;
				lineSegmentsArray[thisSegment].push(l);
			}
		}
	}
}

function drawLines(lines){
	for (var l in lines){
		var color = getColor(l);
		
		var thisLinesNodes = lines[l].nodes;
		for (var n in thisLinesNodes){
			var nodeIndex = parseInt(n);
			//draw segment by segment
			if (nodeIndex != (thisLinesNodes.length -1)){
				var thisSegment = thisLinesNodes[nodeIndex].id + ", " + thisLinesNodes[(parseInt(nodeIndex))+1].id;
				var thisSegmentNodes = [thisLinesNodes[nodeIndex], thisLinesNodes[nodeIndex+1]];
				var thisSegmentWidth = SEGMENT_TOTAL_WIDTH;
				
				//multiple lines in this segment
				//make width smaller and calculate offset for rainbow effect
				if (lineSegmentsArray[thisSegment].length > 1){
					thisSegmentWidth = thisSegmentWidth / (lineSegmentsArray[thisSegment].length);
					var perpSlope = (-1) * ((thisSegmentNodes[0].x - thisSegmentNodes[1].x)/
													(thisSegmentNodes[0].y - thisSegmentNodes[1].y));
					//console.log(perpSlope == Infinity);
					var basePointStart = offsetPoint(thisLinesNodes[nodeIndex], SEGMENT_TOTAL_WIDTH/2, perpSlope, true);
					var basePointEnd = offsetPoint(thisLinesNodes[nodeIndex+1], SEGMENT_TOTAL_WIDTH/2, perpSlope, true);
					
					var myOffset;
					for (var offsetNum in lineSegmentsArray[thisSegment]){
						if (parseInt(lineSegmentsArray[thisSegment][offsetNum]) == parseInt(l)) {
							myOffset = offsetNum;
						}
					}
					
					var offsetStart = offsetPoint(basePointStart, (thisSegmentWidth * (parseInt(myOffset)+1)), perpSlope, false)
					var offsetEnd = offsetPoint(basePointEnd, (thisSegmentWidth * (parseInt(myOffset)+1)), perpSlope, false)
					
					var thisPointStart = offsetPoint(offsetStart, thisSegmentWidth/2, perpSlope, true);
					var thisPointEnd = offsetPoint(offsetEnd, thisSegmentWidth/2, perpSlope, true);
					
					thisSegmentNodes = [thisPointStart, thisPointEnd];
					
				}
				
				var draw = new Kinetic.Line({
					points: thisSegmentNodes,
					stroke: color,
					strokeWidth: thisSegmentWidth,
					lineCap: 'round',
					lineJoin: 'round'
				});
				
				addToLayer(draw, 0);
			}	
		}
	}
}

function offsetPoint(originalPoint, distance, slope, isMoveDown){
	//console.log(distance + ", " + isMoveDown);
	if (slope == undefined){
		console.log("slope is undefined");
	}
	else if (slope == Infinity) {
		var offset = distance;
		if (isMoveDown) {
			offset = offset * -1;
		}
		var newPoint = {x: originalPoint.x, y: originalPoint.y + offset};
		return newPoint;
	}
	else {
		var xOffset = Math.sqrt((distance * distance)/(slope * slope + 1));
		var yOffset = slope * xOffset;
		if (isMoveDown){
			xOffset = xOffset * -1;
			yOffset = yOffset * -1;
		}
		var newPoint = {x: originalPoint.x + xOffset, y: originalPoint.y + yOffset};
		return newPoint;
	}
}

/***********************************
DRAW NODES
***********************************/

function drawNodes(nodes, lines){
	var averageImp = getAverageImp(nodes);
	for (var n in nodes){
		drawPlainNode(nodes[n], averageImp * NODE_IMP_SCALE);
		
		var len = Object.keys(nodes[n].lines).length;
		if (len != 1){
			drawSharedNode(nodes[n], averageImp * NODE_IMP_SCALE, lines);
		}

		drawCaption(nodes[n]);
	}
}

function drawPlainNode(node, averageImp){
	var color = getColor(Object.keys(node.lines)[0]);
	var circle = new Kinetic.Circle({
		x: node.x,
		y: node.y,
		radius: parseInt(node.imp) * NODE_IMP_SCALE,
		stroke: color,
		fill: '#FFFFFF',
		strokeWidth: averageImp/4
	});
	
	addArticleHandler(circle, node);
	addHoverCursor(circle);
	addToLayer(circle, 0);
}

function drawCaption(node){
	var caption_scale = NODE_IMP_SCALE * 1.5;
	var circleCaption = new Kinetic.Text({
		x: node.x - (parseInt(node.imp) * caption_scale)/2,
		y: node.y - (parseInt(node.imp) * caption_scale)/2,
		text: node.text,
		width: parseInt(node.imp) * caption_scale,
		fontSize: (node.imp * NODE_IMP_SCALE)/4,
		fontFamily: 'Calibri',
		textFill: 'black',
		align: 'center'
	});
	
	addArticleHandler(circleCaption, node);
	addHoverCursor(circleCaption);
	addToLayer(circleCaption, 0);
}

function drawSharedNode(node, averageImp, lines){
	allArcs = [];	//gather data for all the arcs that are associated with this node
	
	for (var l in node.lines){
		var color = getColor(parseInt(l));
		var leftPoint = (getNeighborNode(node, lines[parseInt(l)].nodes, -1) == null) ? 
									{x: node.x - 100, y: node.y} : 
									{x: getNeighborNode(node, lines[parseInt(l)].nodes, -1).x, 
										y: getNeighborNode(node, lines[parseInt(l)].nodes, -1).y};
		var centerPoint = {x: node.x, y: node.y};
		var rightPoint = (getNeighborNode(node, lines[parseInt(l)].nodes, 1) == null) ?
								{x: node.x + 100, y: node.y} :
								{x: getNeighborNode(node, lines[parseInt(l)].nodes, 1).x, 
									y: getNeighborNode(node, lines[parseInt(l)].nodes, 1).y};
		var vector1 = {x: leftPoint.x - centerPoint.x, y: leftPoint.y - centerPoint.y};
		var vector2 = {x: rightPoint.x - centerPoint.x, y: rightPoint.y - centerPoint.y};
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
		allArcs.push({color: color, node: node, angle1: angle1, 
								angle2: angle2, size: getArcSize(angle1, angle2)});
	}
	
	//Sort arcs by size, greedily draw them from largest to smallest
	var allSortedArcs = allArcs.sort(function(a,b){
		return (b.size - a.size);
	});
	
	for (var arc in allSortedArcs){
		//largest angled arc, draw entire circle
		if (arc == 0){
			var circle = new Kinetic.Circle({
				x: allSortedArcs[arc].node.x,
				y: allSortedArcs[arc].node.y,
				radius: allSortedArcs[arc].node.imp * NODE_IMP_SCALE,
				stroke: allSortedArcs[arc].color,
				strokeWidth: averageImp/4
			});
			
			addArticleHandler(circle, node);
			addHoverCursor(circle);
			addToLayer(circle, 0);
		}
		
		drawArcs(allSortedArcs[arc].color, allSortedArcs[arc].node, 
						allSortedArcs[arc].angle1, allSortedArcs[arc].angle2, averageImp);
	}
}

function drawArcs(color, node, angle1, angle2, averageImp){
	var arc = new Kinetic.Shape({
		drawFunc: function(canvas) {
			var context = canvas.getContext();
			var x = node.x;
			var y = node.y;
			var radius = node.imp * NODE_IMP_SCALE;
			var startAngle = angle1;
			var endAngle =  angle2;
			var counterClockwise = getDirection(angle1, angle2);
			context.beginPath();
			context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
			context.lineWidth = averageImp/4;
			context.strokeStyle = color;
			context.stroke();
		}
	});
	addToLayer(arc, 0);
}

function getNeighborNode(node, lineNodes, beforeOrAfter){
	for (var n in lineNodes){
		if (lineNodes[n] == node){
			if (((parseInt(n) + beforeOrAfter) >= 0) && ((parseInt(n) + beforeOrAfter) < lineNodes.length)){
				return lineNodes[(parseInt(n) + beforeOrAfter)];
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

function getSmallestImp(nodes){
	var currentSmallestImp = Number.MAX_VALUE;
	for (var n in nodes){
		if (nodes[n].imp < currentSmallestImp){
			currentSmallestImp = nodes[n].imp;
		}
	}
	return currentSmallestImp;
}

function getAverageImp(nodes){
	var impSum = 0;
	var nodesCount = 0;
	for (var n in nodes){
		impSum += parseInt(nodes[n].imp);
		nodesCount++;
	}
	return impSum/nodesCount;
}

/***********************************
DRAW LEGEND
***********************************/

function drawLegend(lines) {
	var legendDiv = document.getElementById('legend');
	
	var numLines = 0;
	for (var l in lines) {
		numLines++;
	}
	
	for (var l in lines) {
		addLegendItem(lines[l], lines, legendDiv, numLines);
	}
}

function addLegendItem(line, lines, legendDiv, numLines) {
	var lineDiv = document.createElement("div");
	lineDiv.style.width = "120px";
	lineDiv.style.height = (100 / numLines) + "px";
	lineDiv.style.background = getColor(getLineNumber(line, lines));
	lineDiv.style.color = "black";
	lineDiv.innerHTML = line.name;
	lineDiv.style.marginBottom = (50 / numLines) + "px";
	lineDiv.setAttribute("align", "center");
	
	legendDiv.appendChild(lineDiv);
}