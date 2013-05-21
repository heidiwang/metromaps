function draw() {
	initializeColors();
	drawLines(-1);
	drawNodes(-1);
}

function drawTimeline(tickStage) {
	
	//create a local copy of nodes, prevents accidental overwriting
	var localNodes = nodes;
	var numNodes = localNodes.length;
	var datesDictionary = {}; // use hash, no duplicates
	var ticks = [];
	
	/* datesDictionary contains all unique dates */
	for (var n in localNodes) {
		var date = localNodes[n].date;
		var splitDate = date.split("-");
		var shortDate = splitDate[1] + "/" + splitDate[0];
		
		if (datesDictionary[shortDate] == null) {
			var startPoint = {x: localNodes[n].x, y: 0};
			var endPoint = {x: localNodes[n].x, y: 10};
			var points = [startPoint, endPoint];
			datesDictionary[shortDate] = {"points": points, "x": localNodes[n].x};
		}
	}
	
	var tickLayer = new Kinetic.Layer();
	
	for (var d in datesDictionary) {
		var tick = new Kinetic.Line({
			points: datesDictionary[d].points,
			stroke: "black"
		});
		
		var label = new Kinetic.Text({
			x: datesDictionary[d].x - (CANVAS_WIDTH/numNodes)/2,
			y: 15,
			width: CANVAS_WIDTH/numNodes,
			text: d,
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center'
		});
		
		tickLayer.add(tick);
		tickLayer.add(label);
	}
	
	tickStage.add(tickLayer);
}

function drawLines(focusLine) {
	var localLines = lines;
	
	
}

function drawNodes(focusLine) {
	var localNodes = nodes;
	for (var n in localNodes){
		//For all the nodes on the current layer...
		if (localNodes[n].layerId == currentLayer.id) {
			drawPlainNode(localNodes[n]);
			if ((localNodes[n].lines).length != 1){
				drawSharedNode(localNodes[n]);
			}
			drawCaption(localNodes[n]);	
		}
	}
}

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
	
	(currentLayer.layer).add(circle);
	(currentLayer.layer).draw();
}

function drawSharedNode(node) {
	
}

function drawCaption(node) {
	var shortText = (node.text).slice(0,8) + "...";
	var circleCaption = new Kinetic.Text({
		x: node.x - parseInt(node.imp) *20 + 10,
		y: node.y - parseInt(node.imp) *20/2,
		text: shortText,
		width: 180,
		height: parseInt(node.imp) *20,
		fontSize: 20,
		fontFamily: 'Calibri',
		fill: '#000000',
		aligh: 'center'
	});

	(currentLayer.layer).add(circleCaption);
	(currentLayer.layer).draw;
}


/***********************************
HELPER FUNCTIONS
***********************************/


function initializeColors(){
	var localLines = lines;
	colors = {};
	for (var l in localLines) {
		colors[l] = get_random_color();
	}
}

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}