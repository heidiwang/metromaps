
/***********************************
CONSTANTS & GLOBALS
***********************************/

var layer0 = new Kinetic.Layer();
//var layer1 = new Kinetic.Layer();
var layer0data;
//var layer1data;
//var LOWEST_LAYER = layer1;
//var LOWEST_LAYER_NUM = 1;
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
	var data = [{id:1, x:50,y:300,size:40,caption:"hello, hi, hola", layer: 0, lines:[0]},
							{id:2, x:250,y:300,size:80,caption:"bye, adios, cya",  layer: 0, lines: [0]},
							{id:3, x:480,y:200,size:70,caption:"cool, wicked, rad",  layer: 0, lines: [0,1]},
							{id:4, x:650,y:230,size:30,caption:"yeah, mhmm, yup",  layer: 0, lines: [0,1]},
							{id:5, x:100,y:50,size:40,caption:"haha, lol, lawlz", layer: 0, lines:[1]},
							{id:6, x:300,y:50,size:30,caption:"happy, smile, laugh", layer: 0, lines:[1]},
							{id:7, x:420,y:80,size:20,caption:"stupid, dumb", layer: 0, lines:[1]},
							{id:8, x:730,y:50,size:30,caption:"okay, kk, kay", layer: 0, lines:[1]},		//breaks when you have it in multiple lines... why?
							/*{id:9, x:220,y:300,size:20,caption:"blah, blah, blah", layer: 1, lines:[0], articles:articleList1},
							{id:10, x:290,y:300,size:30,caption:"word, word, word", layer: 1, lines:[0], articles:articleList2},
							{id:11, x:340,y:300,size:15,caption:"blah, blah, blah", layer: 1, lines:[0], articles:articleList1}*/]
	
	SEGMENT_TOTAL_WIDTH = getLineSize(data);
	
	allLines = getLayer(0, data);
	//layer1data = getLayer(1, data);
	//var allLines = layer0data.concat(layer1data);
	
	draw(data, allLines);
	
	//LOWEST_LAYER.setOpacity(0);
	
	stage.add(layer0);
	//stage.add(layer1);
}

function initializeArticleMenu(){
	document.addEventListener("click", function(){
		//Hide article menu
		if (articleMenuIsVisible == true){
			articleMenuLayer.setOpacity(0);
			articleMenuIsVisible = false;
		}
	}, false);
	
	articleMenuLayer.setOpacity(0);
	articleMenuIsVisible = false;
	stage.add(articleMenuLayer);
}


/***********************************
HELPER FUNCTIONS
***********************************/

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
	//console.log(returnLayer);
	return returnLayer;
}


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
	/*else if (layer == 1){
		layer1.add(object);
	}
	else{
		//error!
	}*/
}

function getLineNumber(line){
	for (l in layer0data){
		if (line == layer0data[l]){
			return l;
		}
	}
}