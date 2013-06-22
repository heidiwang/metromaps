/***********************************
ZOOM LOGIC
***********************************/
function zoom(e) {
	var mousePos = stage.getMousePosition();
	if (mousePos == undefined){
		return;
	}
	
	var zoomAmount = e.wheelDeltaY*0.001;	
	var oldScaleX = (currentLayer.layer).getScale().x;
	var oldScaleY = (currentLayer.layer).getScale().y;
	var newScaleX = oldScaleX+zoomAmount;
	var newScaleY = oldScaleY+zoomAmount;
	
	// Cap the zoom at 0.2 to prevent upside down land
	if ((newScaleX < 0.2 || newScaleY < 0.2) && (zoomAmount < 0)){
			return;
	}
	
	//TODO: add logic for any number of layers
	/*for (var l in layers) {
	}*/
	
	else if ((newScaleX > 2.5 || newScaleY > 2.5) && (zoomAmount > 0)) {
			return;
	}
	
	var scaleRatio = newScaleX / oldScaleX;
		
	// Translate the layers to keep image around cursor point
	var layerPosX = mousePos.x - (currentLayer.layer).getAbsolutePosition().x;
	var layerPosY = mousePos.y - (currentLayer.layer).getAbsolutePosition().y;
	var newAbsPosX = mousePos.x - (layerPosX * scaleRatio);
	var newAbsPosY = mousePos.y - (layerPosY * scaleRatio);
	
	(currentLayer.layer).setAbsolutePosition(newAbsPosX, newAbsPosY);
		
	(currentLayer.layer).setScale(oldScaleX+zoomAmount, oldScaleY+zoomAmount);
	(currentLayer.layer).draw();
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
		(currentLayer.layer).draw();
	});
	caption.on('mouseleave', function() {
		caption.setWidth(100);
		caption.setText(shortText);
		(currentLayer.layer).draw();
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
					(currentLayer.layer).draw();
				});
				seg.on('mouseleave', function() {
					for (var s in lineHighlights) {
						lineHighlights[s].setOpacity(0);
					}
					(currentLayer.layer).draw();
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
			var caption = nodes[nodeId].kineticCaption;
			caption.setWidth(500);
			caption.setText(nodes[nodeId].text);
			(currentLayer.layer).draw();
		}
	});
	segment.on('mouseleave', function(){
		var myNodes = lines[l].nodes;
		for (var n in myNodes) {
			var nodeId = myNodes[n];
			var caption = nodes[nodeId].kineticCaption;
			var shortText = (nodes[nodeId].text).slice(0,8) + "...";
			caption.setWidth(100);
			caption.setText(shortText);
			(currentLayer.layer).draw();
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
	var offsetX = stage.getX();
	var offsetY = stage.getY();
	document.getElementById('articleMenu').innerHTML = "";
	for (var a in node.articles) {
		var article = node.articles[a];
		var shortTitle = (article.title).slice(0,15) + "...";
		var button = document.createElement("button");
		button.setAttribute("articleTitle", article.title);
		button.setAttribute("articleURL", article.url);
		button.setAttribute("onclick", "showArticle(event)");
		button.setAttribute("class", "articleButton");
		//button.addEventListener("click", function(e){console.log('hello');}, false);
		var text = document.createTextNode(shortTitle);
		button.appendChild(text);
		document.getElementById('articleMenu').appendChild(button);
		document.getElementById('articleMenu').innerHTML += "<br/>";
		document.getElementById('articleMenu').style.left = (node.x + offsetX) + "px";
		document.getElementById('articleMenu').style.top = (node.y + offsetY) + "px";
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