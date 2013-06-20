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
		currentPos = currentPos + spacing;
	}
}


function setYPos() {
	// Random Y, for testing
	for (var n in nodes) {
		var min = 0;
		var max = CANVAS_HEIGHT;
		var random = Math.floor(Math.random() * (max - min + 1)) + min;
		nodes[n].y = random;
	}
	
	//var localNodes = nodes;
	//var localLines = lines.map(function(line){return line.id});
	
	//var possibleOrderings = permute(localLines, [], []);
	//console.log(findOptimalOrder(possibleOrderings));
}

/***********************************
OLD LAYOUT STUFF, could probably use some refactoring
***********************************/
/*
function findOptimalOrder(possibleOrderings) {
	var localNodes = nodes;
	var localLines = lines;
	
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

function getOrderIntersections(order) {
	console.log(order);
	var localNodes = nodes;
	var intersections = 0;
	for (var i = 1; i < order.length; i++) {
		var line = parseInt(order[i]);
		var prevLine = parseInt(order[i-1]);
		for (var n in localNodes) {
			console.log(localNodes[n].lines);
			if ($.inArray(localNodes[n].lines, line) && 
					$.inArray(localNodes[n].lines, prevLine)) {
				//console.log("HIT");
				intersections++;
			}
		}
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
};*/