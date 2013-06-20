
/***********************************
CONSTANTS & GLOBALS
***********************************/
var CANVAS_WIDTH = 850;
var CANVAS_HEIGHT = 530;
var LINE_IMP_SCALE = 15;
var NODE_IMP_SCALE = 20;
var NUM_NODES = 0;
var NUM_LINES = 0;
var backgroundLayer = new Kinetic.Layer();
var layer0 = new Kinetic.Layer();
var tickLayer = new Kinetic.Layer();
var articleMenuLayer = new Kinetic.Layer();

/***********************************
 INITIALIZE STAGE AND LAYERS 
 ***********************************/

var stage = new Kinetic.Stage({
	container: 'container',
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT,
	draggable:true
});
var tickStage = new Kinetic.Stage({
	container: 'container',
	width: CANVAS_WIDTH,
	height: 60
});

/***********************************
INITIALIZER FUNCTIONS
***********************************/
$.getJSON('test.json', function(data) {
	initializeZoom();
	initializeLayers(data);
	initializeTicks();
	initializeArticleMenu();
});

function initializeZoom(){
	document.addEventListener("mousewheel", zoom, false);
	addPanLogic();
}
 
// Later, import data here
// For now, using static dummy data for local development
function initializeLayers(json){
	backgroundLayer = new Kinetic.Layer({
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	});
	var test = new Kinetic.Rect({
				x: 10,
				y: 10,
				width: CANVAS_WIDTH,
				height: CANVAS_HEIGHT,
				fill: 'white'
			});
	backgroundLayer.add(test);
	stage.add(backgroundLayer);

	var metromap = json.metromap;
	
	/* Add title to map */
	document.getElementById("mapTitle").innerHTML = metromap.name + " Metromap";
	
	//NODES is a dictionary of nodes, indexed by node id
	//each node contains a date, text, importance, a lines dictionary, and an articles dictionary
	//LINES is a dictionary of lines, indexed by line id
	//each line contains an importance and a name
	var nodes = metromap.events;
	var lines = metromap.lines;
	
	// Count number of nodes and lines for easy reference later
	for (var n in nodes) {
		NUM_NODES++;
	}
	for (var l in lines) {
		NUM_LINES++;
	}
	
	SEGMENT_TOTAL_WIDTH = getSmallestImp(nodes) * LINE_IMP_SCALE;
	lines = addNodes(lines, nodes);
	nodes = setLayout(nodes, lines);
	
	nodes[2].y = 140;
	nodes[5].y = 140;
	nodes[1].y = 300;
	nodes[4].y = 300;
	nodes[10].y = 300;
	nodes[20].y = 420;
	nodes[21].y = 420;
	
	draw(lines, nodes);
	stage.add(layer0);
}

function initializeTicks() { 
	tickStage.add(tickLayer);
}

function initializeArticleMenu(){
	backgroundLayer.on("click", function(){
		//Hide article menu
		if (articleMenuLayer.getVisible()){
			articleMenuLayer.setVisible(false);
		}
	}, false);
	
	articleMenuLayer.setVisible(false);
	stage.add(articleMenuLayer);
}

/***********************************
HELPER FUNCTIONS
***********************************/

function addNodes(lines, nodes) {
	for (var n in nodes){
		var myLines = nodes[n].lines;
		for (var l in myLines){
			var lineId = parseInt(l);
			nodes[n].id = parseInt(n);
			(lines[lineId].nodes).push(nodes[n]);
		}
	}
	return lines;
}

// Current implementation only handles 5 lines or less
// Can always add more if need be
function getColor(line){
	if (line == 1){
		return "#82a6dc";
	}
	else if (line == 2){
		return "#82dc93";
	}
	else if (line == 3){
		return "#dc8282";
	}
	else if (line == 4){
		return "#dcd582";
	}
	else if (line == 5){
		return "#d082dc";
	}
	else{
		return "#EEEEEE";
	}
}

function addToLayer(object, layer){
	if (layer == 0){
		layer0.add(object);
	}
	/*else if (layer == 1){
		layer1.add(object);
	}
	else{
		//error!
	}*/
}

function getLineNumber(line, lines){
	for (var l in lines){
		if (line == lines[l]){
			return l;
		}
	}
}

function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
    	if(obj.hasOwnProperty(prop))
    		++count;
    }
    return count;
}

function addHoverCursor(object) {
	object.on('mouseenter', function() {
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		document.body.style.cursor = 'default';
	});
}

/***********************************
 PANNING LOGIC
 ***********************************/
//make timeline layer move in unison
function addPanLogic() {
	stage.on('dragmove', function(){
		var dragX = layer0.getAbsolutePosition().x;
		tickLayer.setAbsolutePosition(dragX, 0);
		tickLayer.draw();
	});
}