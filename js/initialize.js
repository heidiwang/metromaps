
/***********************************
CONSTANTS & GLOBALS
***********************************/
var CANVAS_WIDTH = 850;
var CANVAS_HEIGHT = 530;
var LINE_IMP_SCALE = 15;
var NODE_IMP_SCALE = 20;
var NUM_NODES = 0;
var NUM_LINES = 0;
var layer0 = new Kinetic.Layer();
var tickLayer = new Kinetic.Layer();
var articleMenuLayer = new Kinetic.Layer();
var articleMenuIsVisible;

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
	addPanLogic();
}
 
// Later, import data here
// For now, using static dummy data for local development
function initializeLayers(){

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
	var json = {
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
}
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
	
	draw(lines, nodes);
	stage.add(layer0);
}

function initializeTicks() { 
	tickStage.add(tickLayer);
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