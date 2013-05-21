

/***********************************
 ZOOM LOGIC
 ***********************************/
function zoom(e){
	
	var mousePos = stage.getMousePosition();
	
	//mousePos is undefined when it's off of the stage 
	//(i.e. somewhere else in browser window)
	if (mousePos != undefined){
		var zoomAmount = e.wheelDeltaY*0.001;
		
		articleMenuLayer.setVisible(false);
		
		// Save the old scale
		var oldScale = layer0.getScale().x;
		
		// Cap the zoom out to 0.2 to prevent upside-down land
		// wheelDeltaY is negative when zooming out
		if ((layer0.getScale().x+zoomAmount < 0.2 || layer0.getScale().y+zoomAmount < 0.2)
			&& (e.wheelDeltaY < 0)){
			setAllScales(0.2, 0.2);
		}
		else if ((layer0.getScale().x+zoomAmount > 2.5 || layer0.getScale().y+zoomAmount > 2.5)
			&& (e.wheelDeltaY > 0)){
			setAllScales(2.5, 2.5);
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
		
		tickLayer.setAbsolutePosition(newAbsPosX, 0);

		layer0.draw();
		tickLayer.draw();
		//layer1.draw();
	} // end mouse if
} //end zoom function

//Change scale of all layers so they move in parallel
function setAllScales(x, y){      	
	layer0.setScale(x, y);
	tickLayer.setScale(x,y);
}

//For now, return the scale of layer 0
//All layers should be set at the same scale at all times
//so you can getScale on any layer
function getAllScales(){
	return layer0.getScale();
}
