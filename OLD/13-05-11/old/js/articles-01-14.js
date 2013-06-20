
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
		});
		
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
