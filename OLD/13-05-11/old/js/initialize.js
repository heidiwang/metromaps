
/***********************************
CONSTANTS & GLOBALS
***********************************/
var CANVAS_WIDTH = 2000;
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
initializeZoom();
initializeLayers();
initializeTicks();
initializeArticleMenu();

function initializeZoom(){
	document.addEventListener("mousewheel", zoom, false);
	//var eventType = (navigator.userAgent.indexOf('Firefox') !=-1) ? "DOMMouseScroll" : "mousewheel";
	//window.addEventListener(eventType, zoom, false);
	addPanLogic();
}
 
// Later, import data here
// For now, using static dummy data for local development
function initializeLayers(){
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

	//var json = data;
	/* var json = {
  "metromap": {
    "name": "Arab Spring",
    "lines": {
      1:
        {
          "name": "Egypt",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      2:
        {
          "name": "Libya",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      3: {
          "name": "Tunisia",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      4: {
          "name": "UN/IMF",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      5: {
          "name": "USA",
          "imp": "1",
          "nodes":[],
          y: 0
        }
    },
    "events": {
      1: {
      		x: 0,
      		y: 0,
          text: "Protests Begin in Tunisia",
          "date": "12-19-2010",
          "lines": {3:1},
          "imp": "1",
          "articles": [{
            "title": "Witnesses report rioting in Tunisian town",
            "url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219"
          },
          {
            "title": "Zine al-Abidine Ben Ali forced to flee Tunisia as protesters claim victory",
            "url": "http://www.guardian.co.uk/world/2011/jan/14/tunisian-president-flees-country-protests"
          }]
        },
       2: {
       		x:0,
       		y:0,
          "text": "Tunisian Leader Overthrown",
          "date": "01-14-2011",
          "lines": {3:2},
          "imp": "3",
          "articles": [{
            "title": "Zine al-Abidine Ben Ali forced to flee Tunisia as protesters claim victory",
            "url": "http://www.guardian.co.uk/world/2011/jan/14/tunisian-president-flees-country-protests"
          }]
        },
        3: {
        	x:0,
        	y:0,
          "text": "Protests Against Egyptian Leader Mubarak Begin",
          "date": "01-17-2011",
          "lines": {1:1},
          "imp": "1",
          "articles": [{
            "title": "Man sets himself on fire near Egyptian parliament",
            "url": "http://www.guardian.co.uk/world/2011/jan/17/man-sets-himself-on-fire-egypt-protest"
          }]
        },
        4: {
        	x:0,
        	y:0,
          "text": "Switzerland Freezes Tunisian Leader's Assets",
          "date": "01-19-2011",
          "lines": {3:3,4:1},
          "imp": "2",
          "articles": [{
            "title": "Switzerland freezes assets of Zine al-Abidine Ben Ali and Laurent Gbagbo",
            "url": "http://www.guardian.co.uk/world/2011/jan/19/switzerland-freezes-assets-ben-ali-gbagbo"
          }]
        },
        5: {
        	x:0,
        	y:0,
          "text": "Obama Demands Mubarak Resign",
          "date": "02-10-2011",
          "lines": {1:2,5:1},
          "imp": "1",
          "articles": [{
            "title": "US and world wrongfooted by Mubarak as White House tries to keep up",
            "url": "http://www.guardian.co.uk/world/2011/feb/10/obama-wrongfooted-mubarak-egypt"
          }]
        },
        6: {
        	x:0,
        	y:0,
          "text": "Mubarak Resigns",
          "date": "02-11-2011",
          "lines": {1:3},
          "imp": "1",
          "articles": [{
            "title": "Hosni Mubarak resigns and Egypt celebrates a new dawn",
            "url": "http://www.guardian.co.uk/world/2011/feb/11/hosni-mubarak-resigns-egypt-cairo"
          }]
        },
        7: {
        	x:0,
        	y:0,
          "text": "Protests Begin in Libya",
          "date": "02-16-2011",
          "lines": {2:1},
          "imp": "1",
          "articles": [{
            "title": "Libyan protesters clash with police in Benghazi",
            "url": "http://www.guardian.co.uk/world/2011/feb/16/libyan-protesters-clash-with-police"
          }]
        },
        8: {
        	x:0,
        	y:0,
          "text": "Obama Vows to Oust Gaddafi",
          "date": "04-14-2011",
          "lines": {5:2,2:2},
          "imp": "2",
          "articles": [{
            "title": "Obama, Cameron and Sarkozy: no let-up in Libya until Gaddafi departs",
            "url": "http://www.guardian.co.uk/world/2011/apr/15/obama-sarkozy-cameron-libya"
          }]
        },
        9: {
        	x:0,
        	y:0,
          "text": "IMF Provides 3 Billion to Egypt for Recovery",
          "date": "06-05-2011",
          "lines": {1:4,4:2,3:4},
          "imp": "1",
          "articles": [{
            "title": "Egypt strikes $3bn IMF deal to 'relaunch' economy",
            "url": "http://www.guardian.co.uk/world/2011/jun/05/egypt-3bn-imf-deal-economy"
          }]
        },
        10: {
        	x:0,
        	y:0,
          "text": "UN Issues Arrest Warrant for Gaddafi",
          "date": "06-27-2011",
          "lines": {4:3,2:3},
          "imp": "1",
          "articles": [{
            "title": "War crimes court issues Gaddafi arrest warrant",
            "url": "http://www.guardian.co.uk/world/2011/jun/27/muammar-gaddafi-arrest-warrant-hague"
          }]
        },
        11: {
        	x:0,
        	y:0,
          "text": "Muammar Gaddafi Killed",
          "date": "10-20-2011",
          "lines": {2:4},
          "imp": "2",
          "articles": [{
            "title": "Muammar Gaddafi is dead, says Libyan PM",
            "url": "http://www.guardian.co.uk/world/2011/oct/20/gaddafi-dead-says-libyan-pm"
          }]
        }
    }
  }
} */
	/* var json = {
  "metromap": {
    "name": "LeBron James",
    "lines": {
      1:
        {
          "name": "Cleveland",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      2:
        {
          "name": "Miami",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      3: {
          "name": "LeBron",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      4: {
          "name": "Dallas",
          "imp": "1",
          "nodes":[],
          y: 0
        }
    },
    "events": {
      1: {
      		x: 0,
      		y: 0,
          text: "Cleveland Cavaliers Franchise Founded",
          "date": "01-01-1970",
          "lines": {1:1},
          "imp": "1",
          "articles": [{
            "title": "Wikipedia: Cleveland Cavaliers",
            "url": "http://en.wikipedia.org/wiki/Cleveland_Cavaliers"
          }]
        },
       2: {
       		x:0,
       		y:0,
          "text": "Dallas Mavericks Franchise Founded",
          "date": "01-01-1980",
          "lines": {4:1},
          "imp": "3",
          "articles": [{
            "title": "Wikipedia: Dallas Mavericks",
            "url": "http://en.wikipedia.org/wiki/Dallas_Mavericks"
          }]
        },
        3: {
        	x:0,
        	y:0,
          "text": "Miami Heat Franchise Founded",
          "date": "01-01-1988",
          "lines": {2:1},
          "imp": "1",
          "articles": [{
            "title": "Wikipedia: Miami Heat",
            "url": "http://en.wikipedia.org/wiki/Miami_Heat"
          }]
        },
        4: {
        	x:0,
        	y:0,
          "text": "LeBron Drafted by Cavaliers",
          "date": "06-26-2003",
          "lines": {3:1,1:2},
          "imp": "2",
          "articles": [{
            "title": "LeBron James Profile",
            "url": "http://www.nbadraft.net/players/lebron-james"
          }]
        },
        5: {
        	x:0,
        	y:0,
          "text": "Heat Defeat Mavericks in 2006 NBA Finals",
          "date": "06-20-2006",
          "lines": {2:2,4:2},
          "imp": "1",
          "articles": [{
            "title": "Wikipedia: 2006 NBA Finals",
            "url": "http://en.wikipedia.org/wiki/2006_NBA_Finals"
          }]
        },
        6: {
        	x:0,
        	y:0,
          "text": "LeBron Traded from Cavaliers to Heat",
          "date": "07-08-2010",
          "lines": {3:2, 2:3, 1:3},
          "imp": "1",
          "articles": [{
            "title": "LeBron James 2010 Free Agency",
            "url": "http://en.wikipedia.org/wiki/LeBron_James#2010_free_agency"
          }]
        },
        7: {
        	x:0,
        	y:0,
          "text": "LeBron, Heat Win 2012 NBA Finals",
          "date": "06-21-2012",
          "lines": {3:3, 2:4},
          "imp": "1",
          "articles": [{
            "title": "Wikipedia: 2012 NBA Finals",
            "url": "http://en.wikipedia.org/wiki/2012_NBA_Finals"
          }]
        }
    }
  }
} */
	/* var json = {
  "metromap": {
    "name": "Fourier Analysis",
    "lines": {
      1:
        {
          "name": "Joseph Fourier",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      2:
        {
          "name": "Carl Friedrich Gauss",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      3: {
          "name": "Fourier Series",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      4: {
          "name": "Fast Fourier Transform",
          "imp": "1",
          "nodes":[],
          y: 0
        },
      5: {
          "name": "John Tukey",
          "imp": "1",
          "nodes":[],
          y: 0
        }
    },
    "events": {
      1: {
      		x: 0,
      		y: 0,
          text: "Joseph Fourier Born",
          "date": "03-21-1768",
          "lines": {1:1},
          "imp": "1",
          "articles": [{"title": "Wikipedia: Joseph Fourier", "url": "http://en.wikipedia.org/wiki/Joseph_Fourier"},
                       {"title": "Joseph Fourier Biography", "url": "http://scienceworld.wolfram.com/biography/Fourier.html"}]
        },
       2: {
       		x:0,
       		y:0,
          "text": "Carl Friedrich Gauss Born",
          "date": "04-30-1777",
          "lines": {2:1},
          "imp": "3",
          "articles": [{"title": "Wikipedia: Carl Friedrich Gauss", "url": "http://en.wikipedia.org/wiki/Carl_Friedrich_Gauss"}]
        },
        3: {
        	x:0,
        	y:0,
          "text": "Gauss Writes Seminal Paper on Trig Series",
          "date": "12-01-1801",
          "lines": {2:2,3:1},
          "imp": "1",
          "articles": [{"title": "Gauss Trig Paper", "url": "http://lseet.univ-tln.fr/~iaroslav/Gauss_Theoria_interpolationis_methodo_nova_tractata.php"}]
        },
        4: {
        	x:0,
        	y:0,
          "text": "Gauss Invents Fast Fourier Transform",
          "date": "01-01-1805",
          "lines": {2:3,4:1},
          "imp": "2",
          "articles": [{"title": "Gauss FFT", "url": "http://ieeexplore.ieee.org/xpls/abs_all.jsp?arnumber=1162257"},
                       {"title": "Wikipedia: Fast Fourier Transform", "url": "http://en.wikipedia.org/wiki/Fast_Fourier_transform"}]
        },
        5: {
        	x:0,
        	y:0,
          "text": "Fourier Asserts All Functions Have Trig Series Representation",
          "date": "01-01-1807",
          "lines": {1:2,3:2},
          "imp": "1",
          "articles": [{"title": "Fourier's Paper", "url": "http://www.infj.ulst.ac.uk/~mmccart/Fourier.pdf"},
                       {"title": "Wikipedia: Fourier's Paper", "url": "http://en.wikipedia.org/wiki/M%C3%A9moire_sur_la_propagation_de_la_chaleur_dans_les_corps_solides#M.C3.A9moire_sur_la_propagation_de_la_chaleur_dans_les_corps_solides"}]
            
        },
        6: {
        	x:0,
        	y:0,
          "text": "Joseph Fourier Dies",
          "date": "05-16-1830",
          "lines": {1:3},
          "imp": "1",
          "articles": [{"title": "Wikipedia: Joseph Fourier", "url": "http://en.wikipedia.org/wiki/Joseph_Fourier"}]
        },
        7: {
        	x:0,
        	y:0,
          "text": "Carl Friedrich Gauss Dies",
          "date": "02-23-1855",
          "lines": {2:4, 4:2},
          "imp": "1",
          "articles": [{"title": "Wikipedia: Carl Friedrich Gauss", "url": "http://en.wikipedia.org/wiki/Carl_Friedrich_Gauss"}]
        },
        8: {
            x:0,
            y:0,
          "text": "John Tukey Born",
          "date": "06-16-1915",
          "lines": {5:1},
          "imp": "1",
          "articles": [{"title": "Wikipedia: John Tukey", "url": "http://en.wikipedia.org/wiki/John_Tukey"}]
        },
        9: {
            x:0,
            y:0,
          "text": "Tukey and Cooley Rediscover FFT Algorithm",
          "date": "08-17-1964",
          "lines": {5:2, 4:2},
          "imp": "1",
          "articles": [{"title": "Wikipedia: Cooley-Tukey FFT Algorithm", "url": "http://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm"}]
        },
        10: {
            x:0,
            y:0,
          "text": "John Tukey Dies",
          "date": "07-26-2000",
          "lines": {5:3},
          "imp": "1",
          "articles": [{"title": "Wikipedia: John Tukey", "url": "http://en.wikipedia.org/wiki/John_Tukey"}]
        }
    }
  }
} */
	/* var json = {
 "metromap": {
 "name": "Fourier Analysis",
 "lines": {
1:
 {
 "name": "one",
 "imp": "1",
 "nodes":[],
 y: 0 },
 2:
 {
 "name": "two",
 "imp": "1",
 "nodes":[],
 y: 0 },
 3:
 {
 "name": "three",
 "imp": "1",
 "nodes":[],
 y: 0 },
 4:
 {
 "name": "four",
 "imp": "1",
 "nodes":[],
 y: 0 },
 5:
 {
 "name": "five",
 "imp": "1",
 "nodes":[],
 y: 0 },
 6:
 {
 "name": "six",
 "imp": "1",
 "nodes":[],
 y: 0 },},
 
 "events": {
1: {
 x: 0,
 y: 0,
 text: "1",
 "date": "01-01-2010",
"lines": {1:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
2: {
 x: 0,
 y: 0,
 text: "2",
 "date": "01-02-2010",
"lines": {1:2},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
3: {
 x: 0,
 y: 0,
 text: "3",
 "date": "01-05-2010",
"lines": {1:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
4: {
 x: 0,
 y: 0,
 text: "4",
 "date": "01-06-2010",
"lines": {1:4},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
5: {
 x: 0,
 y: 0,
 text: "5",
 "date": "01-07-2010",
"lines": {1:5},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
6: {
 x: 0,
 y: 0,
 text: "6",
 "date": "01-08-2010",
"lines": {1:6,3:7,5:2,6:2},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
7: {
 x: 0,
 y: 0,
 text: "7",
 "date": "01-09-2010",
"lines": {1:7,3:8,6:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
8: {
 x: 0,
 y: 0,
 text: "8",
 "date": "01-010-2010",
"lines": {1:8},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
9: {
 x: 0,
 y: 0,
 text: "9",
 "date": "01-02-2010",
"lines": {2:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
10: {
 x: 0,
 y: 0,
 text: "10",
 "date": "01-03-2010",
"lines": {2:2},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
11: {
 x: 0,
 y: 0,
 text: "11",
 "date": "01-04-2010",
"lines": {2:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
12: {
 x: 0,
 y: 0,
 text: "12",
 "date": "01-05-2010",
"lines": {2:4},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
13: {
 x: 0,
 y: 0,
 text: "13",
 "date": "01-06-2010",
"lines": {2:5},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
14: {
 x: 0,
 y: 0,
 text: "14",
 "date": "01-07-2010",
"lines": {2:6},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
15: {
 x: 0,
 y: 0,
 text: "15",
 "date": "01-08-2010",
"lines": {2:7},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
16: {
 x: 0,
 y: 0,
 text: "16",
 "date": "01-09-2010",
"lines": {2:8},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
17: {
 x: 0,
 y: 0,
 text: "17",
 "date": "01-010-2010",
"lines": {2:9},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
18: {
 x: 0,
 y: 0,
 text: "18",
 "date": "01-01-2010",
"lines": {3:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
19: {
 x: 0,
 y: 0,
 text: "19",
 "date": "01-03-2010",
"lines": {3:2},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
20: {
 x: 0,
 y: 0,
 text: "20",
 "date": "01-04-2010",
"lines": {3:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
21: {
 x: 0,
 y: 0,
 text: "21",
 "date": "01-05-2010",
"lines": {3:4},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
22: {
 x: 0,
 y: 0,
 text: "22",
 "date": "01-06-2010",
"lines": {3:5},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
23: {
 x: 0,
 y: 0,
 text: "23",
 "date": "01-07-2010",
"lines": {3:6},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
24: {
 x: 0,
 y: 0,
 text: "24",
 "date": "01-010-2010",
"lines": {3:9},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
25: {
 x: 0,
 y: 0,
 text: "25",
 "date": "01-07-2010",
"lines": {4:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
26: {
 x: 0,
 y: 0,
 text: "26",
 "date": "01-09-2010",
"lines": {4:2},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
27: {
 x: 0,
 y: 0,
 text: "27",
 "date": "01-010-2010",
"lines": {4:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
28: {
 x: 0,
 y: 0,
 text: "28",
 "date": "01-06-2010",
"lines": {5:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
29: {
 x: 0,
 y: 0,
 text: "29",
 "date": "01-09-2010",
"lines": {5:3},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
30: {
 x: 0,
 y: 0,
 text: "30",
 "date": "01-010-2010",
"lines": {5:4},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
31: {
 x: 0,
 y: 0,
 text: "31",
 "date": "01-04-2010",
"lines": {6:1},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
32: {
 x: 0,
 y: 0,
 text: "32",
 "date": "01-010-2010",
"lines": {6:4},
 "imp": "1",
 "articles": [{
 "title": "Witnesses report rioting in Tunisian town",
"url": "http://www.reuters.com/article/2010/12/19/ozatp-tunisia-riot-idAFJOE6BI06U20101219" 
 },
]},
 }
 }
} */

	var json = 
{
 "metromap": {
 "name": "Israel",
 "lines": {
1:
 {
 "name": "attack, military, hamas, palestinians, killed, ",
 "imp": "1",
 "nodes":[],
 y: 0 },2:
 {
 "name": "nuclear, iranian, weapons, sanctions, programs, ",
 "imp": "1",
 "nodes":[],
 y: 0 },3:
 {
 "name": "obama, diplomat, indirectly, moratorium, neighborhoods, ",
 "imp": "1",
 "nodes":[],
 y: 0 },4:
 {
 "name": "catholic, jews, christians, trip, expected, ",
 "imp": "1",
 "nodes":[],
 y: 0 },5:
 {
 "name": "turkey, flotilla, turkish, nine, boat, ",
 "imp": "1",
 "nodes":[],
 y: 0 },},
 "events": {

1: {
 x: 0,
 y: 0,
 text: "gaza palestinians fire united leaders ",
 "date": "2009-01-05",
"lines": {1:1},
 "imp": "2",
 "articles": [{
 "title": "Israeli Forces Push Deeper Into Gaza",
"url": "file:///C:/src/metromaps-heidi/data/638.html"
 },
{
 "title": "Israel Continues Gaza Withdrawal as Cease-Fire Holds",
"url": "file:///C:/src/metromaps-heidi/data/931.html"
 },
{
 "title": "Israel and Hamas Rebuff U.N. Cease-Fire Call",
"url": "file:///C:/src/metromaps-heidi/data/739.html"
 },
{
 "title": "Israeli Troops Advance, Bisecting Gaza",
"url": "file:///C:/src/metromaps-heidi/data/636.html"
 },
{
 "title": "Israel Rejects Cease-Fire, but Offers Gaza Aid",
"url": "file:///C:/src/metromaps-heidi/data/563.html"
 },
]},

2: {
 x: 0,
 y: 0,
 text: "gaza palestinians leaders president war ",
 "date": "2009-01-27",
"lines": {3:1},
 "imp": "2",
 "articles": [{
 "title": "Gaza War Gives Bigger Lift to Israel&#x2019;s Right Than to Those in Power",
"url": "file:///C:/src/metromaps-heidi/data/1127.html"
 },
{
 "title": "Gaza War Created Rift Between Israel and Turkey",
"url": "file:///C:/src/metromaps-heidi/data/1331.html"
 },
{
 "title": "News Analysis: With Strikes, Israel Reminds Foes It Has Teeth",
"url": "file:///C:/src/metromaps-heidi/data/492.html"
 },
{
 "title": "Gaza Violence Complicates Mitchell Mission",
"url": "file:///C:/src/metromaps-heidi/data/1191.html"
 },
{
 "title": "Israel Completes Withdrawal From Gaza",
"url": "file:///C:/src/metromaps-heidi/data/979.html"
 },
]},

3: {
 x: 0,
 y: 0,
 text: "gaza palestinians united president minister ",
 "date": "2009-02-13",
"lines": {2:1},
 "imp": "2",
 "articles": [{
 "title": "Clinton Lays Out Broad Asian Agenda",
"url": "file:///C:/src/metromaps-heidi/data/1548.html"
 },
{
 "title": "Israelis Vote in Volatile Contest for New Leader",
"url": "file:///C:/src/metromaps-heidi/data/1445.html"
 },
{
 "title": "Gaza War Gives Bigger Lift to Israel&#x2019;s Right Than to Those in Power",
"url": "file:///C:/src/metromaps-heidi/data/1127.html"
 },
{
 "title": "Gaza Violence Complicates Mitchell Mission",
"url": "file:///C:/src/metromaps-heidi/data/1191.html"
 },
{
 "title": "An Israeli Party Tips Further Right as Its Leader Woos Centrists",
"url": "file:///C:/src/metromaps-heidi/data/101.html"
 },
]},

4: {
 x: 0,
 y: 0,
 text: "egypt united war cross palestinians ",
 "date": "2009-02-23",
"lines": {1:2},
 "imp": "2",
 "articles": [{
 "title": "Israeli Coalition Faces More Blocks",
"url": "file:///C:/src/metromaps-heidi/data/1793.html"
 },
{
 "title": "Palestinian Rivals Talk Peace in Egypt",
"url": "file:///C:/src/metromaps-heidi/data/1877.html"
 },
{
 "title": "Egypt Is Said to Open Gaza Crossing to Some",
"url": "file:///C:/src/metromaps-heidi/data/1773.html"
 },
{
 "title": "Egypt Accuses Hezbollah of Plotting Attacks and Arms Smuggling to Gaza",
"url": "file:///C:/src/metromaps-heidi/data/3015.html"
 },
{
 "title": "Israeli Envoys Make Final Push to Free Soldier",
"url": "file:///C:/src/metromaps-heidi/data/2283.html"
 },
]},

5: {
 x: 0,
 y: 0,
 text: "regional settlements solutions netanyahu coalition ",
 "date": "2009-03-03",
"lines": {3:2},
 "imp": "2",
 "articles": [{
 "title": "U.S., Israel Tensions Rising Before Visit by Netanyahu",
"url": "file:///C:/src/metromaps-heidi/data/3797.html"
 },
{
 "title": "Syria Talks Signal New Direction for U.S.",
"url": "file:///C:/src/metromaps-heidi/data/1998.html"
 },
{
 "title": "Clinton Starts Mideast Diplomacy With Cash for Gaza",
"url": "file:///C:/src/metromaps-heidi/data/1957.html"
 },
{
 "title": "Jordan King Says Israel Must Accept Palestinian State",
"url": "file:///C:/src/metromaps-heidi/data/3808.html"
 },
{
 "title": "Palestinian Rivals Talk Peace in Egypt",
"url": "file:///C:/src/metromaps-heidi/data/1877.html"
 },
]},

6: {
 x: 0,
 y: 0,
 text: "muslim jordan trip speech john ",
 "date": "2009-05-08",
"lines": {4:1},
 "imp": "2",
 "articles": [{
 "title": "Pope, Hope in Hand, Arrives in Mideast",
"url": "file:///C:/src/metromaps-heidi/data/3644.html"
 },
{
 "title": "Pope, Hope in Hand, Is Heading to Mideast",
"url": "file:///C:/src/metromaps-heidi/data/3628.html"
 },
{
 "title": "Pope to Visit Middle East in May",
"url": "file:///C:/src/metromaps-heidi/data/2100.html"
 },
{
 "title": "News Analysis: Modest Successes and Missed Chances in Pope&#x2019;s Trip",
"url": "file:///C:/src/metromaps-heidi/data/3867.html"
 },
{
 "title": "Pope&#x2019;s Wartime Past Becomes an Issue on Israel Trip",
"url": "file:///C:/src/metromaps-heidi/data/3742.html"
 },
]},

7: {
 x: 0,
 y: 0,
 text: "iranian obama american policies iran ",
 "date": "2009-05-14",
"lines": {2:2},
 "imp": "2",
 "articles": [{
 "title": "U.S., Israel Tensions Rising Before Visit by Netanyahu",
"url": "file:///C:/src/metromaps-heidi/data/3797.html"
 },
{
 "title": "Obama Tells Netanyahu He Has an Iran Timetable",
"url": "file:///C:/src/metromaps-heidi/data/3915.html"
 },
{
 "title": "Clinton in Beirut Ahead of Key Vote",
"url": "file:///C:/src/metromaps-heidi/data/3342.html"
 },
{
 "title": "U.S. May Drop Key Condition for Talks With Iran",
"url": "file:///C:/src/metromaps-heidi/data/3010.html"
 },
{
 "title": "Israel Hopes for U.S. Settlement Shift",
"url": "file:///C:/src/metromaps-heidi/data/4157.html"
 },
]},

8: {
 x: 0,
 y: 0,
 text: "power senior striking capabilities russia ",
 "date": "2009-07-06",
"lines": {2:3},
 "imp": "2",
 "articles": [{
 "title": "Despite Crisis, Policy on Iran Is Engagement",
"url": "file:///C:/src/metromaps-heidi/data/5170.html"
 },
{
 "title": "U.S. Presses China for Tough Response to North Korea",
"url": "file:///C:/src/metromaps-heidi/data/4202.html"
 },
{
 "title": "Agencies Say Iran Has Enough Nuclear Fuel to Build a Bomb",
"url": "file:///C:/src/metromaps-heidi/data/7014.html"
 },
{
 "title": "What &#x2018;Engagement&#x2019; With Iran and North Korea Means",
"url": "file:///C:/src/metromaps-heidi/data/4686.html"
 },
{
 "title": "Israel on Iran: Anything It Takes to Stop Nukes",
"url": "file:///C:/src/metromaps-heidi/data/5773.html"
 },
]},


9: {
 x: 0,
 y: 0,
 text: "power white george construction advisers ",
 "date": "2009-08-18",
"lines": {1:3,3:3},
 "imp": "2",
 "articles": [{
 "title": "Obama Sees &#x2018;Positive Steps&#x2019; in Mideast",
"url": "file:///C:/src/metromaps-heidi/data/6398.html"
 },
{
 "title": "Diplomatic Memo: U.S. to Push Peace in Middle East Media Campaign",
"url": "file:///C:/src/metromaps-heidi/data/5944.html"
 },
{
 "title": "News Analysis: Obama Pins Mideast Hope on Limiting Settlements",
"url": "file:///C:/src/metromaps-heidi/data/4410.html"
 },
{
 "title": "Egyptian President to Tell U.S. Israel Must Make Overture",
"url": "file:///C:/src/metromaps-heidi/data/6350.html"
 },
{
 "title": "Israel May Shift on Settlements Freeze Amid Broader Effort",
"url": "file:///C:/src/metromaps-heidi/data/4986.html"
 },
]},


10: {
 x: 0,
 y: 0,
 text: "accusations committed action evidence civilian ",
 "date": "2009-10-15",
"lines": {1:4},
 "imp": "2",
 "articles": [{
 "title": "U.N. Rights Official Backs Gaza Report",
"url": "file:///C:/src/metromaps-heidi/data/8015.html"
 },
{
 "title": "Palestinians, in Reversal, Press U.N. Gaza Report",
"url": "file:///C:/src/metromaps-heidi/data/7990.html"
 },
{
 "title": "Goldstone Asks White House to Identify &#x2018;Flaws&#x2019; in His Report",
"url": "file:///C:/src/metromaps-heidi/data/8192.html"
 },
{
 "title": "U.N. Council Endorses Gaza Report",
"url": "file:///C:/src/metromaps-heidi/data/8037.html"
 },
{
 "title": "Israel Rejects U.N. Vote Approving Gaza Report",
"url": "file:///C:/src/metromaps-heidi/data/8643.html"
 },
]},

11: {
 x: 0,
 y: 0,
 text: "produced bombs facilities secret planting ",
 "date": "2009-10-26",
"lines": {2:4},
 "imp": "2",
 "articles": [{
 "title": "News Analysis: Both Iran and West Fear a Trap on Deal",
"url": "file:///C:/src/metromaps-heidi/data/8279.html"
 },
{
 "title": "U.N. Inspectors Visit Iranian Site",
"url": "file:///C:/src/metromaps-heidi/data/8269.html"
 },
{
 "title": "Iran Agrees to Draft of Deal on Exporting Nuclear Fuel",
"url": "file:///C:/src/metromaps-heidi/data/8160.html"
 },
{
 "title": "Iran Threatens to Back Out of Fuel Deal",
"url": "file:///C:/src/metromaps-heidi/data/8134.html"
 },
{
 "title": "Iran, Defiant, Approves Plan for 10 Enrichment Sites",
"url": "file:///C:/src/metromaps-heidi/data/9203.html"
 },
]},

12: {
 x: 0,
 y: 0,
 text: "mahmoud prison abbas council fatah ",
 "date": "2009-11-06",
"lines": {3:4},
 "imp": "2",
 "articles": [{
 "title": "Top Palestinian Rules Out Race for Re-election",
"url": "file:///C:/src/metromaps-heidi/data/8617.html"
 },
{
 "title": "Clinton Asks Abbas to Return to Talks",
"url": "file:///C:/src/metromaps-heidi/data/8475.html"
 },
{
 "title": "Mideast Memo: Weighing Netanyahu as Peace Maker",
"url": "file:///C:/src/metromaps-heidi/data/9685.html"
 },
{
 "title": "Israel Offers a Pause in Building New Settlements",
"url": "file:///C:/src/metromaps-heidi/data/9098.html"
 },
{
 "title": "Netanyahu Backs Nuclear Deal That Iran Rejected",
"url": "file:///C:/src/metromaps-heidi/data/8436.html"
 },
]},

13: {
 x: 0,
 y: 0,
 text: "family visiting jewish jerusalem city ",
 "date": "2010-01-16",
"lines": {4:2},
 "imp": "2",
 "articles": [{
 "title": "Jerusalem Journal: Palestinian Family&#x2019;s Eviction Stirs Old Ghosts in a Contested City",
"url": "file:///C:/src/metromaps-heidi/data/12108.html"
 },
{
 "title": "On Eve of Pope&#x2019;s Visit to Synagogue, Some Ask if It Will Help",
"url": "file:///C:/src/metromaps-heidi/data/10565.html"
 },
{
 "title": "Museum Creates New Jerusalem Divide",
"url": "file:///C:/src/metromaps-heidi/data/11334.html"
 },
{
 "title": "Netanyahu Offers an Apology, but No Shift in Policy",
"url": "file:///C:/src/metromaps-heidi/data/12262.html"
 },
{
 "title": "Rebuilt Synagogue Is Caught in Disputes Over Jerusalem",
"url": "file:///C:/src/metromaps-heidi/data/12271.html"
 },
]},

14: {
 x: 0,
 y: 0,
 text: "hillary clinton agency washington american ",
 "date": "2010-02-10",
"lines": {2:5},
 "imp": "2",
 "articles": [{
 "title": "U.S. Eyes Tougher Sanctions Over Iran Nuclear Program",
"url": "file:///C:/src/metromaps-heidi/data/11306.html"
 },
{
 "title": "Clinton Issues Another Warning to Iran",
"url": "file:///C:/src/metromaps-heidi/data/11490.html"
 },
{
 "title": "Iran Is Said to Begin Nuclear Enrichment",
"url": "file:///C:/src/metromaps-heidi/data/11272.html"
 },
{
 "title": "U.S. Sees an Opportunity to Press Iran on Nuclear Fuel",
"url": "file:///C:/src/metromaps-heidi/data/10194.html"
 },
{
 "title": "U.S. Sees Window to Pressure Iran on Nuclear Fuel",
"url": "file:///C:/src/metromaps-heidi/data/10179.html"
 },
]},

15: {
 x: 0,
 y: 0,
 text: "move capitalizing projects neighborhoods vice ",
 "date": "2010-03-15",
"lines": {3:5},
 "imp": "2",
 "articles": [{
 "title": "Netanyahu Offers an Apology, but No Shift in Policy",
"url": "file:///C:/src/metromaps-heidi/data/12262.html"
 },
{
 "title": "News Analysis: Both Sides Claim Success as Diplomatic Row Wanes",
"url": "file:///C:/src/metromaps-heidi/data/12407.html"
 },
{
 "title": "Israel Rejects U.S. Demands on Building in East Jerusalem",
"url": "file:///C:/src/metromaps-heidi/data/12294.html"
 },
{
 "title": "U.S. Mulls Own Plan for Mideast Talks",
"url": "file:///C:/src/metromaps-heidi/data/12329.html"
 },
{
 "title": "Netanyahu Takes Hard Line on Jerusalem Housing",
"url": "file:///C:/src/metromaps-heidi/data/12454.html"
 },
]},

16: {
 x: 0,
 y: 0,
 text: "according spokesman claim killed clinton ",
 "date": "2010-03-22",
"lines": {1:5},
 "imp": "2",
 "articles": [{
 "title": "Gaza Rocket Attack Into Israel Kills a Thai Worker",
"url": "file:///C:/src/metromaps-heidi/data/12353.html"
 },
{
 "title": "Netanyahu and Obama Will Talk on Tuesday",
"url": "file:///C:/src/metromaps-heidi/data/12437.html"
 },
{
 "title": "Clinton Calls Israel&#x2019;s Moves to Ease Tension &#x2018;Useful&#x2019;",
"url": "file:///C:/src/metromaps-heidi/data/12382.html"
 },
{
 "title": "News Analysis: Housing Rift Exposes Other Differences in Israel and U.S.",
"url": "file:///C:/src/metromaps-heidi/data/12638.html"
 },
{
 "title": "Biden Visits Israel to Restart Peace Talks",
"url": "file:///C:/src/metromaps-heidi/data/12063.html"
 },
]},

17: {
 x: 0,
 y: 0,
 text: "starting policies gaza abbas obama ",
 "date": "2010-04-25",
"lines": {3:6},
 "imp": "2",
 "articles": [{
 "title": "Diplomatic Memo: 2 Officials and 2 Views on Discussing Mideast Peace",
"url": "file:///C:/src/metromaps-heidi/data/13521.html"
 },
{
 "title": "Diplomatic Memo: Nudge on Arms Further Divides U.S. and Israel",
"url": "file:///C:/src/metromaps-heidi/data/15328.html"
 },
{
 "title": "Israeli Rightists Stir Tensions in East Jerusalem",
"url": "file:///C:/src/metromaps-heidi/data/13412.html"
 },
{
 "title": "In Quest to Break Mideast Stalemate, a U.S. Option Emerges",
"url": "file:///C:/src/metromaps-heidi/data/12902.html"
 },
{
 "title": "News Analysis: Obama Speech Signals a U.S. Shift on Middle East",
"url": "file:///C:/src/metromaps-heidi/data/13117.html"
 },
]},

18: {
 x: 0,
 y: 0,
 text: "dealing materials conference proposal treaty ",
 "date": "2010-05-03",
"lines": {2:6},
 "imp": "2",
 "articles": [{
 "title": "U.S. Is Pushing to Deter a Mideast Nuclear Race ",
"url": "file:///C:/src/metromaps-heidi/data/13622.html"
 },
{
 "title": "Nuclear Talks at U.N. Open,With Focus on Iran",
"url": "file:///C:/src/metromaps-heidi/data/13642.html"
 },
{
 "title": "At Security Summit, President Obama Calls For Action, Not Talk, to Secure Nuclear Stockpiles",
"url": "file:///C:/src/metromaps-heidi/data/13078.html"
 },
{
 "title": "U.N. Chief Seeks to Strengthen Nuclear Pact",
"url": "file:///C:/src/metromaps-heidi/data/13525.html"
 },
{
 "title": "News Analysis: Obama&#x2019;s Nuclear Strategy Intended as a Message",
"url": "file:///C:/src/metromaps-heidi/data/12881.html"
 },
]},

19: {
 x: 0,
 y: 0,
 text: "home blockades militants gaza fire ",
 "date": "2010-06-01",
"lines": {1:6,5:1},
 "imp": "2",
 "articles": [{
 "title": "Israel Faces New Pressure on Gaza After Raid on Flotilla",
"url": "file:///C:/src/metromaps-heidi/data/14453.html"
 },
{
 "title": "Israeli Easing of Blockade of Gaza Draws Praise of U.S.",
"url": "file:///C:/src/metromaps-heidi/data/14977.html"
 },
{
 "title": "Embattled Israel Reverses Rules on Gaza Blockade",
"url": "file:///C:/src/metromaps-heidi/data/14975.html"
 },
{
 "title": "Israeli Policeman Killed in West Bank",
"url": "file:///C:/src/metromaps-heidi/data/14804.html"
 },
{
 "title": "4 Divers Killed Near Gaza by Israeli Navy",
"url": "file:///C:/src/metromaps-heidi/data/14579.html"
 },
]},

20: {
 x: 0,
 y: 0,
 text: "ships turkish nine water boards ",
 "date": "2010-06-03",
"lines": {5:2},
 "imp": "2",
 "articles": [{
 "title": "Palestinians Said to Reject Goods From Flotilla",
"url": "file:///C:/src/metromaps-heidi/data/14492.html"
 },
{
 "title": "Netanyahu Offers Defense of Israel&#x2019;s Gaza Blockade",
"url": "file:///C:/src/metromaps-heidi/data/14484.html"
 },
{
 "title": "Israel Faces New Pressure on Gaza After Raid on Flotilla",
"url": "file:///C:/src/metromaps-heidi/data/14453.html"
 },
{
 "title": "Days of Planning Led to Flotilla&#x2019;s Hour of Chaos",
"url": "file:///C:/src/metromaps-heidi/data/14543.html"
 },
{
 "title": "Israeli Military Finds Flotilla Killings Justified",
"url": "file:///C:/src/metromaps-heidi/data/15553.html"
 },
]},

21: {
 x: 0,
 y: 0,
 text: "palestinians tries gaza activist turkish ",
 "date": "2010-08-09",
"lines": {5:3},
 "imp": "2",
 "articles": [{
 "title": "Netanyahu Speaks in Flotilla Inquiry",
"url": "file:///C:/src/metromaps-heidi/data/16244.html"
 },
{
 "title": "Activists on Mavi Marmara Fired First, Israeli Military Chief Says",
"url": "file:///C:/src/metromaps-heidi/data/16297.html"
 },
{
 "title": "Israel Stops Jewish Activists From Entering Gaza",
"url": "file:///C:/src/metromaps-heidi/data/17756.html"
 },
{
 "title": "Turkish Action Film Depicts Israeli Raid",
"url": "file:///C:/src/metromaps-heidi/data/16885.html"
 },
{
 "title": "Barak Testifies in Flotilla Inquest",
"url": "file:///C:/src/metromaps-heidi/data/16284.html"
 },
]},

22: {
 x: 0,
 y: 0,
 text: "moratorium extend extensively expire clinton ",
 "date": "2010-09-26",
"lines": {3:7},
 "imp": "2",
 "articles": [{
 "title": "Clinton Voices Hope for Peace Deal in Mideast Within a Year",
"url": "file:///C:/src/metromaps-heidi/data/16533.html"
 },
{
 "title": "No Clear Path on Mideast Talks as Deadline Nears",
"url": "file:///C:/src/metromaps-heidi/data/17686.html"
 },
{
 "title": "Diplomats Desperately Try to Save Mideast Talks",
"url": "file:///C:/src/metromaps-heidi/data/17723.html"
 },
{
 "title": "Israelis and Palestinians to Resume Talks, Officials Say",
"url": "file:///C:/src/metromaps-heidi/data/16517.html"
 },
{
 "title": "Israelis and Palestinians to Resume Talks, Officials Say",
"url": "file:///C:/src/metromaps-heidi/data/16516.html"
 },
]},

23: {
 x: 0,
 y: 0,
 text: "power planting computer enrich united ",
 "date": "2010-09-26",
"lines": {2:7},
 "imp": "2",
 "articles": [{
 "title": "Iran Fights Malware Attacking Computers",
"url": "file:///C:/src/metromaps-heidi/data/17676.html"
 },
{
 "title": "In a Computer Worm, a Possible Biblical Clue",
"url": "file:///C:/src/metromaps-heidi/data/17794.html"
 },
{
 "title": "News Analysis: A Silent Attack, but Not a Subtle One",
"url": "file:///C:/src/metromaps-heidi/data/17710.html"
 },
{
 "title": "Obama Set to Offer Stricter Nuclear Deal to Iran",
"url": "file:///C:/src/metromaps-heidi/data/18553.html"
 },
{
 "title": "U.S. Persuades Israel That Iran's Nuclear Threat Is Not Imminent",
"url": "file:///C:/src/metromaps-heidi/data/16518.html"
 },
]},

24: {
 x: 0,
 y: 0,
 text: "peacefully border bank militants war ",
 "date": "2010-10-18",
"lines": {1:7},
 "imp": "2",
 "articles": [{
 "title": "4 Israeli Settlers Killed in West Bank",
"url": "file:///C:/src/metromaps-heidi/data/16812.html"
 },
{
 "title": "Israel Claims Hamas Has Anti-Aircraft Missiles",
"url": "file:///C:/src/metromaps-heidi/data/18328.html"
 },
{
 "title": "Clash at Israeli-Lebanon Border Turns Lethal ",
"url": "file:///C:/src/metromaps-heidi/data/16109.html"
 },
{
 "title": "U.S. Sees Progress In Mideast Peace Talks",
"url": "file:///C:/src/metromaps-heidi/data/17297.html"
 },
{
 "title": "Response Is Cautious to Israel&#x2019;s Settlements Signal",
"url": "file:///C:/src/metromaps-heidi/data/17205.html"
 },
]},
 }
 }
}

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
	console.log(nodes[20].y);
	
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