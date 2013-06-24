function draw() {
	drawLines();
	drawNodes();
}

/***********************************
TIMELINE FUNCTIONS
***********************************/

function drawTimeline() {
	var numNodes = nodes.length;
	var datesDictionary = {}; // use hash, no duplicates
	var dates = []; // array, for sorting
	var ticks = [];
	tickLayer = new Kinetic.Layer();
	
	/* datesDictionary contains all unique dates */
	for (var n in allNodes) {
		var currentNode = allNodes[n];
		if (datesDictionary[currentNode.datestring] == null) {
			var startPoint = {x: currentNode.x, y: 0};
			var endPoint = {x: currentNode.x, y: 10};
			var points = [startPoint, endPoint];
			var splitDate = currentNode.datestring.split(" ");
			datesDictionary[currentNode.datestring] = {
													"text": splitDate[0] + "\n" + splitDate[2],
													"points": points, 
													"x": currentNode.x,
													"datestring": getDateString(splitDate[1], splitDate[0])};
		}
	}
	
	for (var d in datesDictionary) {
		var tick = new Kinetic.Line({
			points: datesDictionary[d].points,
			stroke: "black"
		});
		
		var label = new Kinetic.Text({
			x: datesDictionary[d].x - (CANVAS_WIDTH/numNodes)/2,
			y: 15,
			width: CANVAS_WIDTH/numNodes,
			text: datesDictionary[d].text,
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center'
		});
		
		tickLayer.add(tick);
		tickLayer.add(label);
	}
	
	tickStage.add(tickLayer);
	return tickLayer;
}

/***********************************
LINES FUNCTIONS
***********************************/

function drawLines() {
	
	// accumulate data into arrays for highlighting event handler
	var allLines = [];
	var allHighlights = [];
	
	// Draw each line, segment by segment
	for (var l in lines) {
		var color = colors[parseInt(lines[l].id)];
		var currentNodeSet = lines[l].nodes;
		var line = [];
		var lineHighlights = [];
		
		// Iterate through this line's nodes to get the segments
		for (var n = 1; n < currentNodeSet.length; n++) {
			//console.log(currentNodeSet);
			var prevNodeId = currentNodeSet[(n-1)];
			var nodeId = currentNodeSet[n];
			var prevNode = getNodeById(prevNodeId);
			var node = getNodeById(nodeId);
			
			// current line segment endpoints
			var startPoint = {x: prevNode.x, y: prevNode.y};
			var endPoint = {x: node.x, y: node.y};
		
			var lineSegment = new Kinetic.Line({
				points: [startPoint, endPoint],
				stroke: color,
				strokeWidth: 30,
				lineCap: 'round',
				lineJoin: 'round'
			});
		
			var lineSegmentHighlight = new Kinetic.Line({
				points: [startPoint, endPoint],
				stroke: 'yellow',
				strokeWidth: 45,
				lineCap: 'round',
				lineJoin: 'round'
			});
			lineSegmentHighlight.setOpacity(0);
			
			// Add highlighting event handler
			line.push(lineSegment);
			lineHighlights.push(lineSegmentHighlight);
			hoverCursor(lineSegment);
		
			currentLayer.add(lineSegmentHighlight);
			
			// multiple lines shared in between neighboring nodes
			// draw rainbow line segment
			var dups = getDups(prevNode.lines, node.lines);
			if (dups.length > 1) {
				drawRainbowLineSegment(prevNode, node, dups);
				lineSegment.setOpacity(0);
			}
			
			currentLayer.add(lineSegment);
			currentLayer.draw();	
		}
		allLines.push(line);
		allHighlights.push(lineHighlights);
	}
	toggleFocus(allLines, allHighlights);
	drawLineTitles();
}

// When two neighboring nodes share multiple lines, draw a rainbow line segment
function drawRainbowLineSegment(leftNode, rightNode, dups) {
	// Get info on this segment
	// Also, calculate width of each seg in rainbow -- depends on how many need to share
	var leftNodePoint = {x: leftNode.x, y: leftNode.y};
	var rightNodePoint = {x: rightNode.x, y: rightNode.y};
	var width = 30 / (dups.length); 
	
	var perpSlope = (-1) * ((leftNode.x - rightNode.x)/
													(leftNode.y - rightNode.y));
	var basePointLeft = offsetPoint (leftNodePoint, 15, perpSlope, true);
	var basePointRight = offsetPoint (rightNodePoint, 15, perpSlope, true);
	
	var currentPointLeft = offsetPoint (basePointLeft, width/2, perpSlope, false);
	var currentPointRight = offsetPoint (basePointRight, width/2, perpSlope, false);
	
	for (var s in dups) {
		var color = colors[parseInt(dups[s])];
		
		var lineSegment = new Kinetic.Line({
			points: [currentPointLeft, currentPointRight],
			stroke: color,
			strokeWidth: width,
			lineCap: 'round',
			lineJoin: 'round'
		});
		
		hoverCursor(lineSegment);
		//TODO: ADD HOVER HIGHLIGHT ON RAINBOW SEGMENTS
				
		currentLayer.add(lineSegment);
		currentLayer.draw();
		
		currentPointLeft = offsetPoint (currentPointLeft, width, perpSlope, false);
		currentPointRight = offsetPoint (currentPointRight, width, perpSlope, false);
	}
}

// Helper function for drawRainbowLineSegment 
// determine which lines are shared by two neighboring nodes
function getDups (array1, array2) {
	var dups = [];
	for (var a in array1) {
		for (var b in array2) {
			if (array1[a] == array2[b]) {
				dups.push(array1[a]);
			}
		}
	}
	return dups;
}

// Helper function for drawRainbowLineSegment
// Find offset and iteratively draw different lines up
function offsetPoint (originalPoint, distance, slope, down) {
	if (slope == undefined){
		console.log("slope is undefined");
	}
	else if (slope == Infinity) {
		var offset = distance;
		if (down) {
			offset = offset * -1;
		}
		return {x: originalPoint.x, y: originalPoint.y + offset};
	}
	else {
		var xOffset = Math.sqrt((distance * distance)/(slope * slope + 1));
		var yOffset = slope * xOffset;
		if (down){
			xOffset = xOffset * -1;
			yOffset = yOffset * -1;
		}
		return {x: originalPoint.x + xOffset, y: originalPoint.y + yOffset};
	}
}

// Title labels for each line
// For now, position it below first node in the line
// TODO: Find a more optimal position
function drawLineTitles() {
	
	for (var l in lines) {
		var firstNodeId = (lines[l].nodes)[0];
		var lineCaption = new Kinetic.Text({
			x: getNodeById(firstNodeId).x - 20,
			y: getNodeById(firstNodeId).y + (getNodeById(firstNodeId).imp * 30),
			text: lines[l].name,
			width: 300,
			height: 20,
			fontSize: 20,
			fontFamily: 'Calibri',
			fill: '#000000',
			aligh: 'center',
			fill: colors[parseInt(lines[l].id)]
		});

		currentLayer.add(lineCaption);
		currentLayer.draw();
	}
}

/***********************************
NODES FUNCTIONS
***********************************/

function drawNodes() {
	for (var n in nodes){
		drawPlainNode(nodes[n]);
		if ((nodes[n].lines).length != 1){
			drawSharedNode(nodes[n]);
		}
		drawCaption(nodes[n]);
	}
}

// Simple case: node is on one line only, draw with one color
function drawPlainNode(node) {
	var color = colors[parseInt(node.lines[0])];
	var circle = new Kinetic.Circle({
		x: node.x,
		y: node.y,
		radius: parseInt(node.imp) * 20,
		stroke: color,
		fill: '#FFFFFF',
		strokeWidth: 10,
	});
	
	node.kineticNode = circle;
	
	// Add event handlers to show article menu
	hoverCursor(circle);
	articleHandler(circle, node);
	
	currentLayer.add(circle);
	currentLayer.draw();
}

// Node is on two or more lines
// Draw with multi-colored arcs
function drawSharedNode(node) {	
	var myArcs = [];
	
	for (var l in node.lines) {
		var currentLineId = (node.lines)[l];
		var currentLine = getLineById(currentLineId);
		var color = colors[currentLineId];
		
		var nodeIndex = parseInt($.inArray(node.id, currentLine.nodes));
		
		// Use previous and next nodes to get the angles of arc
		// If it's the first or last node, use straight angle
		var leftPoint = (nodeIndex == 0) ? 
										{x: node.x - 100, y: node.y} :
										{x: getNodeById((currentLine.nodes[nodeIndex - 1])).x, 
										y: getNodeById((currentLine.nodes[nodeIndex - 1])).y};
		var centerPoint = {x: node.x, y: node.y};
		var rightPoint = (nodeIndex == (currentLine.nodes.length - 1)) ? 
										{x: node.x + 100, y: node.y} :
										{x: getNodeById((currentLine.nodes[nodeIndex + 1])).x, 
										y: getNodeById((currentLine.nodes[nodeIndex + 1])).y};
		
		var vector1 = {x: leftPoint.x - centerPoint.x, y: leftPoint.y - centerPoint.y};
		var vector2 = {x: rightPoint.x - centerPoint.x, y: rightPoint.y - centerPoint.y};
		var angle1 = Math.atan(vector1.y / vector1.x);
		var angle2 = Math.atan(vector2.y / vector2.x);
		
		// ACCOMMODATING NASTY TRIG GARBAGE
		if (vector1.x < 0) {
			angle1 = angle1 + Math.PI;
		}
		if (vector2.x < 0) {
			angle2 = angle2 + Math.PI;
		}
		
		// Accumulate all of the arcs of this node into array myArcs
		myArcs.push({x: centerPoint.x, 
								 y: centerPoint.y, 
								 radius: parseInt(node.imp) * 20,
								 color: color,
								 startAngle: angle1,
								 endAngle: angle2,
								 size: getArcSize(angle1, angle2)});
	}
	
	// Sort the arcs by size
	// Then, greedily draw from largest to smallest
	var mySortedArcs = myArcs.sort(function(a,b){
		return (b.size - a.size);
	});

	for (var a in mySortedArcs){
		var arc = mySortedArcs[a];
		//largest angled arc, draw entire circle
		if (arc == 0){
			var circle = new Kinetic.Circle({
				x: arc.x,
				y: arc.y,
				radius: arc.radius,
				stroke: arc.color,
				fill: '#FFFFFF',
				strokeWidth: 10,
			});
			
			node.kineticNode = circle;
	
			currentLayer.add(circle);
			currentLayer.draw();
		}
		drawArc(arc);
	}
}

// Helper function for drawSharedNode
function drawArc(arc) {
	var arcShape = new Kinetic.Shape({
		drawFunc: function(canvas) {
			var context = canvas.getContext();
			var x = arc.x;
			var y = arc.y;
			var radius = arc.radius;
			var startAngle = arc.startAngle;
			var endAngle =  arc.endAngle;
			var counterClockwise = getArcDirection(arc.startAngle, arc.endAngle);
			context.beginPath();
			context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
			context.lineWidth = 10;
			context.strokeStyle = arc.color;
			context.stroke();
		}
	});

	currentLayer.add(arcShape);
	currentLayer.draw();
}

// Helper function for drawSharedNode
function getArcSize(startAngle, endAngle){
	var startAngleMod = startAngle % (2 * Math.PI);
	var endAngleMod = endAngle % (2 * Math.PI);
	var diffAngle = Math.max(startAngleMod, endAngleMod) - 
									Math.min(startAngleMod, endAngleMod);
	if (diffAngle > Math.PI){
		diffAngle = (2 * Math.PI) - diffAngle;
	}
	return diffAngle;
}

// Helper function for drawSharedNode
function getArcDirection(startAngle, endAngle) {
	var startAngleMod = startAngle % (2 * Math.PI);
	var endAngleMod = endAngle % (2 * Math.PI);
	var diffAngle = Math.max(startAngleMod, endAngleMod) - Math.min(startAngleMod, endAngleMod);

	if (startAngleMod > endAngleMod){
		return (diffAngle < Math.PI);
	}
	else if (startAngleMod < endAngleMod){
		return !(diffAngle < Math.PI);
	}
	else{
		//PROBLEM
	}
}

/***********************************
CAPTIONS FUNCTIONS
***********************************/

function drawCaption(node) {
	var shortText = (node.text).slice(0,8) + "...";
	var circleCaption = new Kinetic.Text({
		x: node.x - parseInt(node.imp) *20 + 10,
		y: node.y - parseInt(node.imp) *20/2,
		text: shortText,
		width: 100,
		height: parseInt(node.imp) *20,
		fontSize: 20,
		fontFamily: 'Calibri',
		fill: '#000000',
		aligh: 'center'
	});
	
	node.kineticCaption = circleCaption;
	
	// Event handlers
	hoverCursor(circleCaption);
	captionExpander(circleCaption, shortText, node.text);
	articleHandler(circleCaption, node);

	currentLayer.add(circleCaption);
	currentLayer.draw();
}
