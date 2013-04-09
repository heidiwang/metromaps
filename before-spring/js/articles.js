
/***********************************
ARTICLE MENU CONSTANTS
***********************************/
var MENU_ITEM_WIDTH = 150;
var MENU_ITEM_SPACING = 10;
var PADDING = 5;

/***********************************
ARTICLE MENU FUNCTIONS
***********************************/

function addArticleHandler(drawItem, node) {
	drawItem.on("click", function() {toggleArticleMenu(drawItem, node);});
}

function toggleArticleMenu(drawItem, node){
	var xpos = drawItem.getAbsolutePosition().x;
	var ypos = drawItem.getAbsolutePosition().y;
	populateArticleMenu(node.articles);
	articleMenuLayer.setAbsolutePosition(xpos, ypos);
	if (!articleMenuLayer.getVisible()){
		articleMenuLayer.setVisible(true);
	}
}

function populateArticleMenu(articles) {
	articleMenuLayer.removeChildren();
	var menuItemHeight = getMaxHeight(articles) + PADDING*2;

	var backgroundRect = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: MENU_ITEM_WIDTH + PADDING*2,
		height: articles.length * menuItemHeight + 
						articles.length * MENU_ITEM_SPACING + 
						MENU_ITEM_SPACING,
		fill: '#aaaaaa',
		cornerRadius: 3
	});
	articleMenuLayer.add(backgroundRect);
	
	var currentPosition = 0;
	for (var i in articles){
		var button = new Kinetic.Rect({
			x: PADDING,
			y: currentPosition + MENU_ITEM_SPACING,
			width: MENU_ITEM_WIDTH,
			height: menuItemHeight,
			fill: '#ffffff',
			cornerRadius: 2
		});
		
		var title = new Kinetic.Text({
			x: PADDING*2,
			y: currentPosition + MENU_ITEM_SPACING + PADDING,
			text: articles[i].title,
			fontSize: 9,
			width: MENU_ITEM_WIDTH - PADDING*2,
			fontFamily: 'Calibri',
			textFill: 'blue',
			
		});
		currentPosition += (menuItemHeight + MENU_ITEM_SPACING);
		
		addClick(button, title, articles[i]);
		addHoverCursor(title);
		
		articleMenuLayer.add(button);
		articleMenuLayer.add(title);
	}
}

function getMaxHeight(articles) {
	var maxHeight = 0;
	for (var i in articles) {
		var title = new Kinetic.Text({
			x: 0,
			y: 0,
			text: articles[i].title,
			fontSize: 9,
			width: MENU_ITEM_WIDTH - PADDING*2,
		});
		var height = title.getHeight();
		if (height > maxHeight) {
			maxHeight = height;
		}
	}
	return maxHeight;
}

function addClick(button, title, article){
	/*button.on('click', function() {
			window.open(article.url,'_blank');
	});*/
	title.on('click', function(){
			//window.open(article.url,'_blank');
			
			$("#inline1 #articleTitle").text(article.title);
			$("#inline1 #articleText").text("blah blah blah");
			$("#fancyboxbutton").click();
	});
}