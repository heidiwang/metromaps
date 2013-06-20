/*
In this iteration:
- Refactored the way data is stored and read to accommodate line merging
- Built logic to color nodes that have multiple lines

To do:
- Refine the shared node logic (test on others, first/last node issues, etc.)
- Add logic for lines moving in parallel (make them not overlap)
*/

/***********************************
CONSTANTS & GLOBALS
***********************************/

var layer0 = new Kinetic.Layer();
var layer1 = new Kinetic.Layer();
var layer0data;
var layer1data;
var LOWEST_LAYER = layer1;
var LOWEST_LAYER_NUM = 1;
var articleMenuLayer = new Kinetic.Layer();
var articleMenuIsVisible;


/***********************************
 INITIALIZE STAGE AND LAYERS 
 ***********************************/

var stage = new Kinetic.Stage({
	container: 'container',
	width: 800,
	height: 400,
	draggable:true
});

initializeZoom();
initializeLayers();
initializeArticleMenu();


/***********************************
INITIALIZER FUNCTIONS
***********************************/

function initializeZoom(){
	document.addEventListener("mousewheel", zoom, false);
}
 
// Later, import data here. For now, using static dummy data
function initializeLayers(){

	//deal with article lists later...
		var articleList1 = [{title:"Title1", link: "http://www.google.com"},
												{title:"Title2", link: "http://www.google.com"},
												{title:"Title3", link: "http://www.google.com"},
												{title:"Title4", link: "http://www.google.com"}];
		var articleList2 = [{title:"Title1", link: "http://www.google.com"},
												{title:"Title2", link: "http://www.google.com"},
												{title:"Title3", link: "http://www.google.com"},
												{title:"Title4", link: "http://www.google.com"},
												{title:"Title5", link: "http://www.google.com"},
												{title:"Title6", link: "http://www.google.com"},
												{title:"Title7", link: "http://www.google.com"}];
	//list of all nodes
	var data = [{x:50,y:300,size:40,caption:"hello, hi, hola", layer: 0, lines:[0]},
										{x:250,y:300,size:80,caption:"bye, adios, cya",  layer: 0, lines: [0]},
										{x:480,y:200,size:70,caption:"cool, wicked, rad",  layer: 0, lines: [0,1]},
										{x:680,y:200,size:30,caption:"yeah, mhmm, yup",  layer: 0, lines: [0]},
										{x:100,y:50,size:40,caption:"haha, lol, lawlz", layer: 0, lines:[1]},
										{x:300,y:50,size:30,caption:"happy, smile, laugh", layer: 0, lines:[1]},
										{x:420,y:50,size:20,caption:"stupid, dumb", layer: 0, lines:[1]},
										{x:700,y:50,size:30,caption:"okay, kk, kay", layer: 0, lines:[1]},		//breaks when you have it in multiple lines... why?
										{x:220,y:300,size:20,caption:"blah, blah, blah", layer: 1, lines:[0], articles:articleList1},
										{x:290,y:300,size:30,caption:"word, word, word", layer: 1, lines:[0], articles:articleList2},
										{x:340,y:300,size:15,caption:"blah, blah, blah", layer: 1, lines:[0], articles:articleList1}]
	
	layer0data = getLayer(0, data);
	layer1data = getLayer(1, data);
	
	draw(layer0data, layer0);
	draw(layer1data, layer1);
}

function initializeArticleMenu(){
	document.addEventListener("click", function(){
		//Hide article menu
		if (articleMenuIsVisible == true){
			//articleMenuLayer.setOpacity(0);
			//articleMenuIsVisible = false;
			stage.remove(articleMenuLayer);
		}
	}, false);
	
	articleMenuLayer.setOpacity(0);
	articleMenuIsVisible = false;
	stage.add(articleMenuLayer);
}

/***********************************
 ZOOM LOGIC
 ***********************************/
function zoom(e){
	
	var mousePos = stage.getMousePosition();
	
	//mousePos is undefined when it's off of the stage 
	//(i.e. somewhere else in browser window)
	if (mousePos != undefined){
		
		var zoomAmount = e.wheelDeltaY*0.001;
	
		// Save the old scale
		var oldScale = layer0.getScale().x;
		
		// Cap the zoom out to 0.2 to prevent upside-down land
		// wheelDeltaY is negative when zooming out
		if ((layer0.getScale().x+zoomAmount < 0.2 || layer0.getScale().y+zoomAmount < 0.2)
			&& (e.wheelDeltaY < 0)){
			setAllScales(0.2, 0.2);
		}
		else{
			setAllScales(getAllScales().x+zoomAmount, getAllScales().y+zoomAmount);
		}
		
		var newScale = getAllScales().x;
		var scaleRatio = newScale / oldScale;
		
		// Translate the layers to keep image around cursor point
		var layerX = mousePos.x - layer0.getAbsolutePosition().x;
		var layerY = mousePos.y - layer0.getAbsolutePosition().y;
		var newAbsPosX = mousePos.x - (layerX * scaleRatio);
		var newAbsPosY = mousePos.y - (layerY * scaleRatio);
		layer0.setAbsolutePosition(newAbsPosX, newAbsPosY);
		layer1.setAbsolutePosition(newAbsPosX, newAbsPosY);

		// Opacity logic, transitioning between layers
		if (layer0.getScale().x < 2){
			layer0.setOpacity(1);
			layer1.setOpacity(0);
		}
		else if ((layer0.getScale().x > 2) && (layer0.getScale().x < 2.5)){	//fade zone
			layer0.setOpacity(Math.abs(1 - (layer0.getScale().x - 2) * 2));
			layer1.setOpacity((layer0.getScale().x - 2) * 2);
		}
		else if (layer0.getScale().x > 2.5){
			layer0.setOpacity(0);
			layer1.setOpacity(1);
		}
		else {
			//error!
		}
		
		layer0.draw();
		layer1.draw();
	} // end mouse if
} //end zoom function

//Change scale of all layers so they move in parallel
function setAllScales(x, y){      	
	layer0.setScale(x, y);
	layer1.setScale(x, y);
}

//For now, return the scale of layer 0
//All layers should be set at the same scale at all times
//so you can getScale on any layer
function getAllScales(){
	return layer0.getScale();
}

// Returns an array of lines, each line is an array of nodes
// Basically gets data into alternative usable form
function getLayer(layer, data){
	var myNodes = [];
	var returnLayer = [];
	
	//get only the nodes on this layer
	for (i in data){
		if (data[i].layer == layer){
			myNodes.push(data[i]);
		}
	}
	
	// initialize line arrays
	for (i in myNodes){
		var thisNodesLines = myNodes[i].lines;
		//initialize the lines arrays
		for (j in thisNodesLines){
			if (!(thisNodesLines[j] in returnLayer)){
				returnLayer[(thisNodesLines[j])] = new Array();
			}
		}
	}
	
	//populate line arrays with nodes
	for (i in myNodes){
		var thisNodesLines = myNodes[i].lines;
		for (j in thisNodesLines){
			(returnLayer[(thisNodesLines[j])]).push(myNodes[i]);
		}
	}
	
	//sort by x
	for (line in returnLayer){
		(returnLayer[line]).sort(function(a,b) { 
    	return ( a.x < b.x ? -1 : (a.x > b.x ? 1 : 0 ) );
		});
	}
	
	return returnLayer;
}


/***********************************
DRAWING FUNCTIONS
***********************************/

//data is an array of lines
//each line is an array of nodes
function draw(data, layer){
	for (line in data){
		var thisLine = data[line];
		
		totalNodeSize = 0;
		for (node in thisLine){
			totalNodeSize += thisLine[node].size;
		}
		averageNodeSize = totalNodeSize/(thisLine.length);
		
		drawLine(line, thisLine, averageNodeSize);
	}
	
	drawNode(data, drawNodeBases);
	drawNode(data, drawNodeShared);
	
	if (layer == LOWEST_LAYER){
		layer.setOpacity(0);
	}
	
	stage.add(layer);
}

function drawNode(data, fun){
	for (line in data){
		var thisLine = data[line];
		
		totalNodeSize = 0;
		for (node in thisLine){
			totalNodeSize += thisLine[node].size;
		}
		averageNodeSize = totalNodeSize/(thisLine.length);
		
		for (node in thisLine){
			fun(thisLine[node], averageNodeSize, thisLine);
		} 
	}

}

function drawNodeBases(node, averageNodeSize, line){
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
		if (node.layer == LOWEST_LAYER_NUM){
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
		
		addToLayer(circle, (node.layer));
		addToLayer(circleCaption, (node.layer)); 
}

function drawNodeShared(node, averageNodeSize, line){
	
	// SHARED NODE, ONLY DRAW A PARTIAL ARC
	if ((node.lines).length > 1){
	
		var color = getColor(getLineNumber(line));
		
		var myIndex = line.indexOf(node);
		//NEED TO ADD STUFF IN CASE THE SHARED NODE IS FIRST OR LAST
		var point1 = (line[myIndex-1] == undefined) ? 
									{x: line[myIndex].x - 100, y: line[myIndex].y} : 
									{x: line[myIndex-1].x, y: line[myIndex-1].y};
		var centerPoint = {x: node.x, y: node.y};
		var point2 = (line[myIndex+1].x == undefined) ?
								{x: line[myIndex].x + 100, y: line[myIndex].y} :
								{x: line[myIndex+1].x, y: line[myIndex+1].y};
		
		var vector1 = {x: point1.x - centerPoint.x, y: point1.y - centerPoint.y};
		var vector2 = {x: point2.x - centerPoint.x, y: point2.y - centerPoint.y};
		var angle1 = Math.atan(vector1.y / vector1.x);
		var angle2 = Math.atan(vector2.y / vector2.x);
		
		// ACCOMMODATING NASTY TRIG GARBAGE
		if (angle1 > 0 && vector1.y < 0){
			angle1 = angle1 - Math.PI;
		}
		if (angle1 < 0 && vector1.y > 0) {
			angle1 = angle1 + Math.PI;
		} 
		if (angle2 > 0 && vector2.y < 0){
			angle2 = angle2 - Math.PI;
		}
		if (angle2 < 0 && vector2.y > 0) {
			angle2 = angle2 + Math.PI;
		} 
		var arc = new Kinetic.Shape({
			drawFunc: function(canvas) {
				var context = canvas.getContext();
				var x = node.x;
				var y = node.y;
				var radius = node.size;
				var startAngle = Math.min(angle1, angle2);
				var endAngle =  Math.max(angle1, angle2);
				var counterClockwise = false;
				context.beginPath();
				context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
				context.lineWidth = averageNodeSize/4;
				context.strokeStyle = color;
				context.stroke();
			}
		});

		addToLayer(arc, node.layer);
	}
}

// "data" is a line, which is represented by an array of node objects
function drawLine(lineNum, data, averageNodeSize){
	var color = getColor(lineNum);
	
	//Draw the line
	var line = new Kinetic.Line({
		points: data,
		stroke: color,
		strokeWidth: averageNodeSize / 1.5,
		lineCap: 'round',
		lineJoin: 'round'
	});
	
	addToLayer(line, data[0].layer);
}
 
/***********************************
ARTICLE MENU FUNCTIONS
***********************************/

function toggleArticleMenu(node, articles){
	if (articleMenuIsVisible == false){
		var xpos = node.getAbsolutePosition().x + node.getRadius();
		var ypos = node.getAbsolutePosition().y;
		
		populateArticleMenu(articles);
		articleMenuLayer.setAbsolutePosition(xpos, ypos);
		articleMenuLayer.setOpacity(1);
		articleMenuIsVisible = true;
	}
}

//TODO: move constants out to global vars
function populateArticleMenu(articles) {
	
	articleMenuLayer.removeChildren();
	
	var backgroundRect = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: 150,
		height: articles.length * 35 + 10,
		fill: '#aaaaaa',
		cornerRadius: 7
	});
	articleMenuLayer.add(backgroundRect);
	
	
	var currentPosition = 0;
	for (i in articles){
		var button = new Kinetic.Rect({
			x: 10,
			y: currentPosition + 10,
			width: 130,
			height: 25,
			fill: '#ffffff',
			cornerRadius: 4
		})
		
		var title = new Kinetic.Text({
			x: 15,
			y: currentPosition + 15,
			text: articles[i].title,
			fontSize: 12,
			fontFamily: 'Calibri',
			textFill: 'black'
		});
		currentPosition += (25 + 10);
		
		addClick(button, title, articles[i]);
		
		articleMenuLayer.add(button);
		articleMenuLayer.add(title);
	}
}

function addClick(button, title, article){
		button.on('click', function() {
			window.open(article.link,'_blank');
			//console.log(article.title + ": " + article.link);
		});
		title.on('click', function(){
			window.open(article.link,'_blank');
			//console.log(article.title + ": " + article.link);
		});
}


/***********************************
HELPER FUNCTIONS
***********************************/

function getColor(line){
	if (line == 0){
		return "#C8ADD2";
	}
	else if (line == 1){
		return "#B9DCAD";
	}
	else{
		return "#EEEEEE";
	}
}

function addToLayer(object, layer){
	if (layer == 0){
		layer0.add(object);
	}
	else if (layer == 1){
		layer1.add(object);
	}
	else{
		//error!
	}
}

function getLineNumber(line){
	for (l in layer0data){
		if (line == layer0data[l]){
			return l;
		}
	}
}