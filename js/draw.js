/***********************************
DRAWING FUNCTIONS
***********************************/
var lineSegmentsArray = {};
var SEGMENT_TOTAL_WIDTH;

var nodesGlobal;
var linesGlobal;

function draw(lines, nodes){
	nodesGlobal = nodes;
	linesGlobal = lines;
	drawTimeTicks(nodes);
	initializeLineSegments(lines);
	drawLines(lines);
	drawNodes(nodes, lines);
	//drawLegend(lines);
	drawLineLabels(lines);
}

function drawLineLabels(lines) {
	for (var l in lines) {
		var firstNode = lines[l].nodes[0];
		
		var lineLabel = new Kinetic.Text({
			x: firstNode.x,
			y: firstNode.y + 100,
			text: lines[l].name,
			width: 800,
			fontSize: 60,
			fontFamily: 'Calibri',
			fill: getColor(l)
		});
		addToLayer(lineLabel, 0);
	}
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
		var shortDate = splitDate[0] + "/" + splitDate[1];
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
		var shortDate = splitDate[0] + "/" + splitDate[1];
		var label = new Kinetic.Text({
			x: ticks[t].x - (CANVAS_WIDTH/NUM_NODES)/2,
			y: 15,
			width: CANVAS_WIDTH/NUM_NODES,
			text: shortDate,
			fontSize: 22,
			fontFamily: 'Calibri',
			fill: 'black',
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

function drawLines(lines, focus){
//	console.log(focus);
	//console.log(lines);
	
	for (var l in lines){
		
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
				
				opacity = 1;
				var color = getColor(l);
				if (focus != undefined) {
					var opacity = 0.4;
					var commonElements = [];
					for(var i = 0; i<lineSegmentsArray[thisSegment].length; i++){
						for(var j=0; j<focus.length; j++){
							if (lineSegmentsArray[thisSegment][i] === focus[j]) {
								commonElements.push(focus[j]);
							}
						}
					}
					
					for (var e in commonElements) {
						opacity = 1;
					}
				}
				
				var draw = new Kinetic.Line({
					points: thisSegmentNodes,
					stroke: color,
					strokeWidth: thisSegmentWidth,
					lineCap: 'round',
					lineJoin: 'round'
				});
				draw.setOpacity(opacity);

				addHoverCursor(draw);
				addFocusToggle(draw, lines, lineSegmentsArray[thisSegment]);
				addToLayer(draw, 0);
			}	
		}
	}
}

function addFocusToggle(object, lines, segmentArray) {	
	object.on("mouseenter", function() {
		layer0.removeChildren();
		drawLines(lines, segmentArray);
		drawNodes(nodesGlobal, lines, segmentArray);
		drawLineLabels(lines);
		layer0.draw();
	});
	
	object.on("mouseleave", function() {
		layer0.removeChildren();
		drawLines(lines);
		drawNodes(nodesGlobal, lines);
		drawLineLabels(lines);
		layer0.draw();
	});
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

function drawNodes(nodes, lines, focus){	
	var averageImp = getAverageImp(nodes);
	
	for (var n in nodes){
		
		var opacity = 1;
		if (focus != undefined) {
			var opacity = 0.4;
			var thisNodesLines = nodes[n].lines;
			for (var l in thisNodesLines) {
				for (var f in focus) {
					if (String(l) == focus[f]) {
						opacity = 1;
					}
				}
			}
		}
			
		drawPlainNode(nodes[n], averageImp * NODE_IMP_SCALE, opacity);
	
		var len = Object.keys(nodes[n].lines).length;
		if (len != 1){
			drawSharedNode(nodes[n], averageImp * NODE_IMP_SCALE, lines, opacity);
		}

		drawCaption(nodes[n], opacity);
	}
}

function drawPlainNode(node, averageImp, opacity){

	var color = getColor(Object.keys(node.lines)[0]);
	var circle = new Kinetic.Circle({
		x: node.x,
		y: node.y,
		radius: parseInt(node.imp) * NODE_IMP_SCALE,
		stroke: color,
		fill: '#FFFFFF',
		strokeWidth: averageImp/4
	});
	circle.setOpacity(opacity);
	
	addArticleHandler(circle, node);
	addHoverCursor(circle);
	addToLayer(circle, 0);
}

function drawCaption(node, opacity){
	var caption_scale = NODE_IMP_SCALE * 1.5;
	var newText = "\n" + (node.text).slice(0,8) + "..."
	var circleCaption = new Kinetic.Text({
		x: node.x - (parseInt(node.imp) * caption_scale)/2,
		y: node.y - (parseInt(node.imp) * caption_scale)/2,
		text: newText, //node.text,
		width: 180, //parseInt(node.imp) * caption_scale,
		height: parseInt(node.imp) * caption_scale,
		fontSize: (node.imp * NODE_IMP_SCALE)/2,
		fontFamily: 'Calibri',
		fill: 'black',
		align: 'center'
	});
	circleCaption.setOpacity(opacity);
	
	addArticleHandler(circleCaption, node);
	addHoverCursor(circleCaption);
	addHoverCaptionExpander(circleCaption, parseInt(node.imp) * caption_scale, node.text);
	addToLayer(circleCaption, 0);
}

function drawSharedNode(node, averageImp, lines, opacity){
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
			circle.setOpacity(opacity);
			
			addArticleHandler(circle, node);
			addHoverCursor(circle);
			addToLayer(circle, 0);
		}
		
		drawArcs(allSortedArcs[arc].color, allSortedArcs[arc].node, 
						allSortedArcs[arc].angle1, allSortedArcs[arc].angle2, averageImp, opacity);
	}
}

function drawArcs(color, node, angle1, angle2, averageImp, opacity){
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
	arc.setOpacity(opacity);
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
	var width = parseInt((legendDiv.style.width).replace("px", ""));
	var height = parseInt((legendDiv.style.height).replace("px", ""));
	
	var numLines = 0;
	for (var l in lines) {
		numLines++;
	}
	
	for (var l in lines) {
		addLegendItem(lines[l], lines, legendDiv, numLines, width, height);
	}
}

function addLegendItem(line, lines, legendDiv, numLines, width, height) {
	
	var lineDiv = document.createElement("div");
	lineDiv.style.width = width;
	lineDiv.style.height = (height / numLines) + "px";
	lineDiv.style.background = getColor(getLineNumber(line, lines));
	lineDiv.style.color = "black";
	lineDiv.innerHTML = line.name;
	lineDiv.style.marginBottom = (50 / numLines) + "px";
	lineDiv.setAttribute("align", "center");
	
	legendDiv.appendChild(lineDiv);
}