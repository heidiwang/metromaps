/***********************************
LAYOUT ALGORITHM
***********************************/

function setLayout(nodes, lines) {
	var xNodes = setXPos(nodes);
	var xyNodes = setYPos(xNodes, lines);
	return xyNodes;
}

function setXPos(nodes) {
	var spacing = (CANVAS_WIDTH - 100)/(NUM_NODES - 1);
	var currentPos = 50;
	for (var n in nodes) {
		nodes[n].x = currentPos;
		currentPos = currentPos + spacing;
	}
	return nodes;
}

function setYPos(nodes, lines) {
	var lineOrdering = getLineOrdering(nodes, lines);
	var spacing = (CANVAS_HEIGHT - 100)/(NUM_LINES - 1);
	var currentPos = 50;
	
	// set each line's primary y coordinate
	for (var i = 0; i < lineOrdering.length; i++) {
		var thisLineId = lineOrdering[i];
		lines[thisLineId].y = currentPos;
		
		/*var draw = new Kinetic.Line({
			points: [{x:0, y:currentPos}, {x:CANVAS_WIDTH, y:currentPos}],
			stroke: getColor(thisLineId),
			strokeWidth: 2,
			lineCap: 'round',
			lineJoin: 'round'
		});
		addToLayer(draw, 0);*/
		
		currentPos = currentPos + spacing;
	}

	// set each node's y coordinate based on which lines it's in
	for (var n in nodes) {
		var sumY = 0;
		var numLines = 0;
		for (l in nodes[n].lines) {
			sumY += lines[l].y;
			numLines++;
		}
		nodes[n].y = sumY/numLines;
	}
	
	// move the singletons around to a more optimal layout
	adjust(nodes, lines);
	return nodes;
}


// Move singletons to the nearest shared node
// If two singletons have the same "nearest shared," make them split
function adjust(nodes, lines) {
	var singletonNodes = getSingletonNodes(nodes);
	var sharedToSingleDict = {};
	
	//initialize the dictionary items to empty arrays
	for (var n in singletonNodes) {
		for (var l in singletonNodes[n].lines) {
			var nearestSharedId = getNearestShared(singletonNodes[n], lines[l].nodes).id;
			sharedToSingleDict[nearestSharedId] = [];
		}
	}
	
	for (var n in singletonNodes) {
		for (var l in singletonNodes[n].lines) {
			var nearestSharedId = getNearestShared(singletonNodes[n], lines[l].nodes).id;
			(sharedToSingleDict[nearestSharedId]).push(singletonNodes[n]);
			var nearestShared = getNearestShared(singletonNodes[n], lines[l].nodes);
			singletonNodes[n].y = nearestShared.y;
		}
	}
	
	for (var sharedNodeId in sharedToSingleDict) {
	
		var adjustNodesArray = sharedToSingleDict[sharedNodeId];
		var adjustNodesBeforeArray = [];
		var adjustNodesAfterArray = [];
		
		for (var n in adjustNodesArray) {
			if (adjustNodesArray[n].x < nodes[sharedNodeId].x) {
				adjustNodesBeforeArray.push(adjustNodesArray[n]);
			}
			else if (adjustNodesArray[n].x > nodes[sharedNodeId].x) {
				adjustNodesAfterArray.push(adjustNodesArray[n]);
			}
		}
		
		if (adjustNodesBeforeArray.length > 1) {
			var range = 50;		// for now, using a constant; can change to something better later
			var currentPoint = nodes[sharedNodeId].y - (range/2);
			var increment = range/(adjustNodesBeforeArray.length - 1);
			for (var singletonNode in adjustNodesBeforeArray) {
				adjustNodesBeforeArray[singletonNode].y = currentPoint;
				currentPoint += increment;
			}
		}
		
		if (adjustNodesAfterArray.length > 1) {
			var range = 50;		// for now, using a constant; can change to something better later
			var currentPoint = nodes[sharedNodeId].y - (range/2);
			var increment = range/(adjustNodesAfterArray.length - 1);
			for (var singletonNode in adjustNodesAfterArray) {
				adjustNodesAfterArray[singletonNode].y = currentPoint;
				currentPoint += increment;
			}
		}
	}
}

function getSingletonNodes(nodes) {
	var singletonNodes = [];
	for (var n in nodes) {
		if (countProperties(nodes[n].lines) == 1) {
			singletonNodes.push(nodes[n]);
		}
	}
	return singletonNodes;
}

//given a singleton node, return the nearest shared node on the same line
function getNearestShared(node, lineNodes) {
	var nodeIndex;
	var nodeTitle;
	var sharedNodeIndices = [];
	for (var n in lineNodes){
		if (lineNodes[n] == node){
			nodeIndex = n;
			nodeTitle = lineNodes[n].text;
		}
		if (countProperties(lineNodes[n].lines) > 1) {
			sharedNodeIndices.push(n);
		}
	}
	
	var shortestDist = Number.MAX_VALUE;
	var shortestDistIndex = nodeIndex;
	//case: no shared nodes in the line
	if (sharedNodeIndices.length == 0) {
		shortestDistIndex = nodeIndex;
	}
	for (var i = 0; i < sharedNodeIndices.length; i++) {
		var dist = Math.max(parseInt(sharedNodeIndices[i]), nodeIndex) - 
							 Math.min(parseInt(sharedNodeIndices[i]), nodeIndex);
		if (dist < shortestDist) {
			shortestDist = dist;
			shortestDistIndex = sharedNodeIndices[i];
		}
	}
	return lineNodes[shortestDistIndex];
}

function getLineOrdering(nodes, lines) {
	var lineNums = [];
	for (var l in lines) {
		lineNums.push(parseInt(l));
	}
	
	var possibleOrderings = permute(lineNums);
	var intersections = getNumIntersections(nodes, lines);
	
	var highestScore = 0;
	var highestOrder = [];
	for (var order in possibleOrderings) {
		var currentOrderScore = 0;
		var currentOrder = possibleOrderings[order];
		for (var i = 0; i < currentOrder.length - 1; i++) {
			var key = currentOrder[i] + ", " + currentOrder[i+1];
			var keySwap = currentOrder[i+1] + ", " + currentOrder[i];
			if ((key in intersections) || (keySwap in intersections)) {
				currentOrderScore++;
			}
		}
		if (currentOrderScore > highestScore) {
			highestScore = currentOrderScore;
			highestOrder = currentOrder;
		}
	}
	return highestOrder;
}

function getNumIntersections(nodes, lines) { 
	var intersections = {};
	
	//initialize, set to zero
	for (var n in nodes) {
		var thisNodesLines = nodes[n].lines;
		if (countProperties(thisNodesLines) > 1) {
			var thisLinesIntersections = [];
			for (var l in thisNodesLines) {
				thisLinesIntersections.push(l);
			}
			for (var i = 0; i < thisLinesIntersections.length - 1; i++) {
				var line1 = thisLinesIntersections[parseInt(i)];
				var line2 = thisLinesIntersections[parseInt(i)+1];
				var intersect = line1 + ", " + line2;
				intersections[intersect] = 0;
			}
		}
	}
	
	// count number of intersections between lines
	for (var n in nodes) {
		var thisNodesLines = nodes[n].lines;
		if (countProperties(thisNodesLines) > 1) {
			var thisLinesIntersections = [];
			for (var l in thisNodesLines) {
				thisLinesIntersections.push(l);
			}
			for (var i = 0; i < thisLinesIntersections.length - 1; i++) {
				var line1 = thisLinesIntersections[i];
				var line2 = thisLinesIntersections[parseInt(i)+1];
				var intersect = line1 + ", " + line2;
				intersections[intersect]++;
			}
		}
	}
	return intersections;
}

function largestNumIntersections(intersections) { 
	var currentHighest = 0;
	var currentHighestIntersection = {};
	for (var i in intersections) { 
		if (intersections[i] > currentHighest) {
			currentHighest = intersections[i];
			currentHighestIntersection = i;
		}
	}
	return currentHighestIntersection;
}

/***********************************
PERMUTATIONS HELPER CODE
***********************************/

var permArr = [],
usedChars = [];

function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
};
