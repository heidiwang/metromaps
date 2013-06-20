/***********************************
LAYOUT ALGORITHM
***********************************/

function setLayout() {
	setXPos();
	setYPos();
}

// Evenly space the nodes across the timeline
function setXPos() {
	var spacing = (CANVAS_WIDTH - 100)/(nodes.length - 1);
	var currentPos = 50;
	for (var n in nodes) {
		nodes[n].x = currentPos;
		currentPos += spacing;
	}
}

// Find all possible orderings of the lines (i.e. 1234, 1243, 1324, etc.) using permute
// After you find the optimal line ordering, set a major Y position for each line
// For all nodes, Y is the average of the lines it is a part of
function setYPos() {	
	var lineIds = lines.map(function(lineObj){ return lineObj.id;});
	var possibleOrderings = permute(lineIds, [], []);
	var optimalOrdering = findOptimalOrder(possibleOrderings);
	console.log(possibleOrderings);
	
	// Evenly space the nodes according to their line ordering
	var lineYs = {};
	var spacing = (CANVAS_HEIGHT - 100)/(lines.length - 1);
	var currentPos = 50;
	for (var l in optimalOrdering) {
		var lineNumber = optimalOrdering[l];
		lineYs[lineNumber] = currentPos;
		currentPos += spacing;
	}
	
	// Assign Y values to each node, average of the lines it is on
	for (var n in nodes) {
		var myYSum = 0;
		var myLines = nodes[n].lines;
		for (var l in myLines) {
			var currLine = myLines[l];
			myYSum += lineYs[currLine];
		}
		var myYAverage = myYSum / myLines.length;
		nodes[n].y = myYAverage;
	}
}

// Iterate through all possible orderings of the lines
// Give each ordering a score based on how many nodes they share
// Return the highest scoring ordering
function findOptimalOrder(possibleOrderings) {
	var highestScore = 0;
	var highestOrder = [];
	for (var order in possibleOrderings) {
		var orderIntersections = getOrderIntersections(possibleOrderings[order]);
		if (orderIntersections > highestScore) {
			highestScore = orderIntersections;
			highestOrder = possibleOrderings[order];
		}
	}
	return highestOrder;
}

// For a given ordering (i.e. 1234),
// count how many nodes the neighboring lines share
// How many nodes do lines 1 and 2 share? How many nodes do lines 2 and 3 share? etc.
function getOrderIntersections(order) {
	var intersections = 0;
	for (var i = 1; i < order.length; i++) {
		var line = parseInt(order[i]);
		var prevLine = parseInt(order[i-1]);
		for (var n in nodes) {
			if (($.inArray(line, nodes[n].lines) != -1) && 
					($.inArray(prevLine, nodes[n].lines) != -1)) {
				intersections++;
			}
		}
		break;
	}
	return intersections;
}

// Recursively find all orderings of the lines
function permute(input, permArr, usedChars) {
	var i, ch;
	for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
					permArr.push(usedChars.slice());
			}
			permute(input, permArr, usedChars);
			input.splice(i, 0, ch);
			usedChars.pop();
	}
	return permArr;
};