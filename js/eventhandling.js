/***********************************
ZOOM & PAN LOGIC
***********************************/
function synchronizePan() {
	stage.on('dragmove', function () {
		tickStage.setX(stage.getX());
		tickStage.draw();
	});
}

//TODO: Figure out why the node circles spazz out while zooming
function zoom(e) {
	//Clear the article menu
	document.getElementById('articleMenu').style.display = "none";
	
	var mousePos = stage.getMousePosition();
	if (mousePos == undefined){
		return;
	}
	
	var zoomAmount = e.wheelDeltaY*0.001;	
	var oldScaleX = currentLayer.getScale().x;
	var oldScaleY = currentLayer.getScale().y;
	var newScaleX = oldScaleX+zoomAmount;
	var newScaleY = oldScaleY+zoomAmount;
	
	var numLayers = countLayers();
	
	// Cap the upper and lower bounds of zooming
	if ((newScaleX < 0.2 || newScaleY < 0.2) && (zoomAmount < 0)){
		currentLayer.draw();
		return;
	}	
	else if ((newScaleX > numLayers*2 || newScaleY > numLayers*2) 
					&& (zoomAmount > 0)) {
		currentLayer.draw();
		return;
	}
	
	// Translate the layer to keep image around cursor point
	var scaleRatio = newScaleX / oldScaleX;
	var layerPosX = mousePos.x - currentLayer.getAbsolutePosition().x;
	var layerPosY = mousePos.y - currentLayer.getAbsolutePosition().y;
	var newAbsPosX = mousePos.x - (layerPosX * scaleRatio);
	var newAbsPosY = mousePos.y - (layerPosY * scaleRatio);
	currentLayer.setAbsolutePosition(newAbsPosX, newAbsPosY);
	tickLayer.setAbsolutePosition(newAbsPosX, 0);
	currentLayer.setScale(oldScaleX+zoomAmount, oldScaleY+zoomAmount);
	tickLayer.setScale(oldScaleX+zoomAmount, oldScaleY+zoomAmount);
	
	// Draw the correct nodes and lines for this zoom amount onto the layer
	// Each layer gets 2 units of zoom (Layer0 gets 0-2, Layer1 gets 2-4, etc.)
	var prevLayerId = lines[0].layerId;
	var layerId = getLayer(newScaleX);
	if (prevLayerId != layerId) {
		setNodesAndLines(layerId);
	}
	
	currentLayer.draw();
	tickLayer.draw();
}

function getLayer(scale) {
	return Math.ceil((scale/2) - 1);
}


/***********************************
HIGHLIGHTING
***********************************/

function hoverCursor(object) {
	object.on('mouseenter', function() {
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		document.body.style.cursor = 'default';
	});
}

function captionExpander(caption, shortText, fullText) {
	caption.on('mouseenter', function() {
		caption.setWidth(500);
		caption.setText(fullText);
		currentLayer.draw();
	});
	caption.on('mouseleave', function() {
		caption.setWidth(100);
		caption.setText(shortText);
		currentLayer.draw();
	});
}

function toggleFocus(allLines, allHighlights) {	
	for (var l in allLines) {
		var line = allLines[l]
		for (var s in line) {
			var segment = line[s];
			// closure to iteratively create event handlers
			(function (seg, lineHighlights) {
				seg.on('mouseenter', function() {
					for (var s in lineHighlights) {
						lineHighlights[s].setOpacity(1);
					}
					currentLayer.draw();
				});
				seg.on('mouseleave', function() {
					for (var s in lineHighlights) {
						lineHighlights[s].setOpacity(0);
					}
					currentLayer.draw();
				});
			})(segment, allHighlights[l]);
			
			expandAllNodes(segment, l);
		}
	}
}

function expandAllNodes(segment, l) {
	segment.on('mouseenter', function(){
		var myNodes = lines[l].nodes;
		for (var n in myNodes) {
			var nodeId = myNodes[n];
			var caption = getNodeById(nodeId).kineticCaption;
			caption.setWidth(500);
			caption.setText(getNodeById(nodeId).text);
			currentLayer.draw();
		}
	});
	segment.on('mouseleave', function(){
		var myNodes = lines[l].nodes;
		for (var n in myNodes) {
			var nodeId = myNodes[n];
			var caption = getNodeById(nodeId).kineticCaption;
			var shortText = (getNodeById(nodeId).text).slice(0,8) + "...";
			caption.setWidth(100);
			caption.setText(shortText);
			currentLayer.draw();
		}
	});
}

/***********************************
ARTICLES
***********************************/

function articleHandler(object, node) {
	object.on("click", function() {
		toggleArticleMenuOn(node);
	});
}

function clearArticleHandler(object) {
	object.on('mousedown', function(){
		toggleArticleMenuOff();
	});
}

function toggleArticleMenuOn(node) {
	var offsetX = currentLayer.getAbsolutePosition().x;
	var offsetY = currentLayer.getAbsolutePosition().y;
	var nodePosX = node.kineticNode.getX() * currentLayer.getScale().x;
	var nodePosY = node.kineticNode.getY() * currentLayer.getScale().y;
	
	document.getElementById('articleMenu').innerHTML = "";
	for (var a in node.articles) {
		var article = node.articles[a];
		var shortTitle = (article.title).slice(0,15) + "...";
		var button = document.createElement("button");
		button.setAttribute("articleTitle", article.title);
		button.setAttribute("articleURL", article.url);
		button.setAttribute("onclick", "showArticle(event)");
		button.setAttribute("class", "articleButton");
		var text = document.createTextNode(shortTitle);
		button.appendChild(text);
		document.getElementById('articleMenu').appendChild(button);
		document.getElementById('articleMenu').innerHTML += "<br/>";
		document.getElementById('articleMenu').style.left = (nodePosX + offsetX) + "px";
		document.getElementById('articleMenu').style.top = (nodePosY + offsetY) + "px";
		document.getElementById('articleMenu').style.display = "inline";
	}
}

function toggleArticleMenuOff() {
	document.getElementById('articleMenu').style.display = "none";
}

function addButtonHandler(button) {
	button.onclick = function() {
		console.log("CLICK");
	}
}

function showArticle(e) {
	var caller = e.target || e.srcElement;
	console.log();
	$("#articleTitle").text(caller.getAttribute("articleTitle"));
	$("#articleText").text(caller.getAttribute("articleURL"));
	$("#fancyboxbutton").click();
}