/***********************************
LAYOUT ALGORITHM
***********************************/

function setLayout() {
	setXPos();
	setYPos();
}

function setXPos() {
	var spacing = (CANVAS_WIDTH - 100)/(nodes.length - 1);
	var currentPos = 50;
	for (var n in nodes) {
		nodes[n].x = currentPos;
		currentPos = currentPos + spacing;
	}
}

function setYPos() {
	for (var n in nodes) {
		var min = 0;
		var max = CANVAS_HEIGHT;
		var random = Math.floor(Math.random() * (max - min + 1)) + min;
		nodes[n].y = random;
	}
}
