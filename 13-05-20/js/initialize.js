
/***********************************
CONSTANTS & GLOBALS
***********************************/
var stage;
var tickStage;
var data;
var CANVAS_WIDTH = 1250;
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
INITIALIZER FUNCTIONS
***********************************/
function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    formSubmit();

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('my-form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}


function formSubmit() {
	
	//Clear old canvas
	document.getElementById("mapTitle").innerHTML = "";
	stage = null;
	tickStage = null;
	backgroundLayer = new Kinetic.Layer();
	layer0 = new Kinetic.Layer();
	tickLayer = new Kinetic.Layer();
	articleMenuLayer = new Kinetic.Layer();

	var myNode = document.getElementById("container");
	while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
	}
	
	var filename = ($('#filename_input')).val() + ".json";
	console.log(filename);
	
	$.getJSON(filename, function(data) {
	
	/* INITIALIZE STAGE AND LAYERS */

		stage = new Kinetic.Stage({
			container: 'container',
			width: CANVAS_WIDTH,
			height: CANVAS_HEIGHT,
			draggable:true
		});
		tickStage = new Kinetic.Stage({
			container: 'container',
			width: CANVAS_WIDTH,
			height: 60
		});

		initializeZoom();
		initializeLayers(data);
		initializeTicks();
		initializeArticleMenu();
	}).error(function() {
		console.log("ERROR");
		document.getElementById("container").innerHTML = "File not found";
	});
}



/*var data = {
 "metromap": {
 "name": "Israel",
 "lines": {
"1":
 {
 "name": "attack, military, hamas, palestinians, killed, ",
 "imp": "1",
 "nodes":[],
 "y": 0 },
 "2":
 {
 "name": "nuclear, iranian, weapons, sanctions, programs, ",
 "imp": "1",
 "nodes":[],
 "y": 0 },
 "3":
 {
 "name": "obama, diplomat, indirectly, moratorium, neighborhoods, ",
 "imp": "1",
 "nodes":[],
 "y": 0 },
 "4":
 {
 "name": "catholic, jews, christians, trip, expected, ",
 "imp": "1",
 "nodes":[],
 "y": 0 },
 "5":
 {
 "name": "turkey, flotilla, turkish, nine, boat, ",
 "imp": "1",
 "nodes":[],
 "y": 0 }
},

 "events": {

"1": {
 "x": 0,
 "y": 0,
 "text": "gaza palestinians fire united leaders ",
 "date": "2009-01-05",
"lines": {"1":1},
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
 }]},


"2": {
 "x": 0,
 "y": 0,
 "text": "gaza palestinians leaders president war ",
 "date": "2009-01-27",
"lines": {"3":1},
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
 }
]},


"3": {
 "x": 0,
 "y": 0,
 "text": "gaza palestinians united president minister ",
 "date": "2009-02-13",
"lines": {"2":1},
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
 }
]},


"4": {
 "x": 0,
 "y": 0,
 "text": "egypt united war cross palestinians ",
 "date": "2009-02-23",
"lines": {"1":2},
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
 }
]},


"5": {
 "x": 0,
 "y": 0,
 "text": "regional settlements solutions netanyahu coalition ",
 "date": "2009-03-03",
"lines": {"3":2},
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
 }
]},



"6": {
 "x": 0,
 "y": 0,
 "text": "muslim jordan trip speech john ",
 "date": "2009-05-08",
"lines": {"4":1},
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
 }
]},


"7": {
 "x": 0,
 "y": 0,
 "text": "iranian obama american policies iran ",
 "date": "2009-05-14",
"lines": {"2":2},
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
 }
]},


"8": {
 "x": 0,
 "y": 0,
 "text": "power senior striking capabilities russia ",
 "date": "2009-07-06",
"lines": {"2":3},
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
 }
]},


"9": {
 "x": 0,
 "y": 0,
 "text": "power white george construction advisers ",
 "date": "2009-08-18",
"lines": {"1":3,"3":3},
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
 }
]},


"10": {
 "x": 0,
 "y": 0,
 "text": "accusations committed action evidence civilian ",
 "date": "2009-10-15",
"lines": {"1":4},
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
 }
]},


"11": {
 "x": 0,
 "y": 0,
 "text": "produced bombs facilities secret planting ",
 "date": "2009-10-26",
"lines": {"2":4},
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
 }
]},

"12": {
 "x": 0,
 "y": 0,
 "text": "mahmoud prison abbas council fatah ",
 "date": "2009-11-06",
"lines": {"3":4},
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
 }
]},


"13": {
 "x": 0,
 "y": 0,
 "text": "family visiting jewish jerusalem city ",
 "date": "2010-01-16",
"lines": {"4":2},
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
 }
]},

"14": {
 "x": 0,
 "y": 0,
 "text": "hillary clinton agency washington american ",
 "date": "2010-02-10",
"lines": {"2":5},
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
 }
]},


"15": {
 "x": 0,
 "y": 0,
 "text": "move capitalizing projects neighborhoods vice ",
 "date": "2010-03-15",
"lines": {"3":5},
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
 }
]},

"16": {
 "x": 0,
 "y": 0,
 "text": "according spokesman claim killed clinton ",
 "date": "2010-03-22",
"lines": {"1":5},
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
 }
]},


"17": {
 "x": 0,
 "y": 0,
 "text": "starting policies gaza abbas obama ",
 "date": "2010-04-25",
"lines": {"3":6},
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
 }
]},

"18": {
 "x": 0,
 "y": 0,
 "text": "dealing materials conference proposal treaty ",
 "date": "2010-05-03",
"lines": {"2":6},
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
 }
]},


"19": {
 "x": 0,
 "y": 0,
 "text": "home blockades militants gaza fire ",
 "date": "2010-06-01",
"lines": {"1":6,"5":1},
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
 }
]},

"20": {
 "x": 0,
 "y": 0,
 "text": "ships turkish nine water boards ",
 "date": "2010-06-03",
"lines": {"5":2},
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
 }
]},

"21": {
 "x": 0,
 "y": 0,
 "text": "palestinians tries gaza activist turkish ",
 "date": "2010-08-09",
"lines": {"5":3},
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
 }
]},


"22": {
 "x": 0,
 "y": 0,
 "text": "moratorium extend extensively expire clinton ",
 "date": "2010-09-26",
"lines": {"3":7},
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
 }
]},

"23": {
 "x": 0,
 "y": 0,
 "text": "power planting computer enrich united ",
 "date": "2010-09-26",
"lines": {"2":7},
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
 }
]},



"24": {
 "x": 0,
 "y": 0,
 "text": "peacefully border bank militants war ",
 "date": "2010-10-18",
"lines": {"1":7},
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
 }
]}





}
	

}
}*/
/*var data = {
 "metromap": {
 "name": "Obama",
 "lines": {
1:
 {
 "name": "washington, united, president, related, military, ",
 "imp": "1",
 "nodes":[],
 y: 0 },2:
 {
 "name": "taliban, afghan, pakistani, militants, kabul, ",
 "imp": "1",
 "nodes":[],
 y: 0 },3:
 {
 "name": "tehran, ahmadinejad, fuel, atomic, uranium, ",
 "imp": "1",
 "nodes":[],
 y: 0 },4:
 {
 "name": "trade, export, bakiyev, currency, debris, ",
 "imp": "1",
 "nodes":[],
 y: 0 },5:
 {
 "name": "palestinians, netanyahu, middle, jerusalem, settlements, ",
 "imp": "1",
 "nodes":[],
 y: 0 },6:
 {
 "name": "detainee, guant, namo, suspect, interrogation, ",
 "imp": "1",
 "nodes":[],
 y: 0 },},
 "events": {
1: {
 x: 0,
 y: 0,
 text: "president bush leaders secretary war ",
 "date": "2009-01-02",
"lines": {5:1},
 "imp": "2",
 "articles": [{
 "title": "Syria Talks Signal New Direction for U.S.",
"url": "file:///C:/src/metromaps-heidi/data/1998.html"
 },
{
 "title": "News Analysis: Clinton, Familiar With Pitfalls of Mideast Politics, May Face Early Test in Gaza",
"url": "file:///C:/src/metromaps-heidi/data/586.html"
 },
{
 "title": "Iran Is on Clinton&#x2019;s Agenda, if Not Her Itinerary",
"url": "file:///C:/src/metromaps-heidi/data/2022.html"
 },
{
 "title": "Gaza Crisis Is Another Challenge for Obama, Who Defers to Bush for Now",
"url": "file:///C:/src/metromaps-heidi/data/493.html"
 },
{
 "title": "Clinton Starts Mideast Diplomacy With Cash for Gaza",
"url": "file:///C:/src/metromaps-heidi/data/1957.html"
 },
]},

2: {
 x: 0,
 y: 0,
 text: "president bush military closely remained ",
 "date": "2009-01-22",
"lines": {6:1},
 "imp": "2",
 "articles": [{
 "title": "Obama to Close Foreign Prisons and Guant&#xE1;namo Camp",
"url": "file:///C:/src/metromaps-heidi/data/1007.html"
 },
{
 "title": "Obama&#x2019;s War on Terror May Resemble Bush&#x2019;s in Some Areas",
"url": "file:///C:/src/metromaps-heidi/data/1654.html"
 },
{
 "title": "Ex-Detainee of U.S. Describes a 6-Year Ordeal",
"url": "file:///C:/src/metromaps-heidi/data/661.html"
 },
{
 "title": "Obama Orders Secret Prisons and Detention Camps Closed",
"url": "file:///C:/src/metromaps-heidi/data/1022.html"
 },
{
 "title": "U.S. Won&#x2019;t Label Terror Suspects as &#x2018;Combatants&#x2019;",
"url": "file:///C:/src/metromaps-heidi/data/2238.html"
 },
]},

3: {
 x: 0,
 y: 0,
 text: "president related military security planning ",
 "date": "2009-02-05",
"lines": {4:1},
 "imp": "2",
 "articles": [{
 "title": "U.S. Searches for Alternative to Central Asian Base",
"url": "file:///C:/src/metromaps-heidi/data/1332.html"
 },
{
 "title": "Russia Offers Kind Words, but Its Fist Is Clenched",
"url": "file:///C:/src/metromaps-heidi/data/1361.html"
 },
{
 "title": "Gates Says U.S. Still Discussing Air Base With Kyrgyzstan",
"url": "file:///C:/src/metromaps-heidi/data/1695.html"
 },
{
 "title": "NATO Chief Calls for More European Troops in Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/1407.html"
 },
{
 "title": "Biden Signals U.S. Is Open to Deal With Russia on Missiles",
"url": "file:///C:/src/metromaps-heidi/data/1398.html"
 },
]},

4: {
 x: 0,
 y: 0,
 text: "president related bush policies security ",
 "date": "2009-02-16",
"lines": {1:1,3:1},
 "imp": "2",
 "articles": [{
 "title": "North Korea Threatens Long-Range Missile Test",
"url": "file:///C:/src/metromaps-heidi/data/1619.html"
 },
{
 "title": "Clinton, Heading Abroad, Takes Softer Tone on North Korea",
"url": "file:///C:/src/metromaps-heidi/data/1594.html"
 },
{
 "title": "News Analysis: China Jittery About Obama Amid Signs of Harder Line",
"url": "file:///C:/src/metromaps-heidi/data/1060.html"
 },
{
 "title": "News Analysis: China Jittery About Obama Amid Signs of Harder Line",
"url": "file:///C:/src/metromaps-heidi/data/1075.html"
 },
{
 "title": "U.S. Prepares to Broach Hard Issues With China",
"url": "file:///C:/src/metromaps-heidi/data/1470.html"
 },
]},

5: {
 x: 0,
 y: 0,
 text: "president bush policies security military ",
 "date": "2009-03-28",
"lines": {2:1},
 "imp": "2",
 "articles": [{
 "title": "White House Debate Led to Plan to Widen Afghan Effort",
"url": "file:///C:/src/metromaps-heidi/data/2620.html"
 },
{
 "title": "Obama Widens Missile Strikes Inside Pakistan",
"url": "file:///C:/src/metromaps-heidi/data/1724.html"
 },
{
 "title": "U.S. Weighs Taliban Strike Into Pakistan",
"url": "file:///C:/src/metromaps-heidi/data/2348.html"
 },
{
 "title": "Obstacle in Bid to Curb Afghan Trade in Narcotics",
"url": "file:///C:/src/metromaps-heidi/data/357.html"
 },
{
 "title": "C.I.A. Pakistan Campaign Is Working, Director Says",
"url": "file:///C:/src/metromaps-heidi/data/1871.html"
 },
]},

6: {
 x: 0,
 y: 0,
 text: "council range sanctions resolutely lee ",
 "date": "2009-04-05",
"lines": {4:2},
 "imp": "2",
 "articles": [{
 "title": "Defying World, North Koreans Launch Rocket",
"url": "file:///C:/src/metromaps-heidi/data/2816.html"
 },
{
 "title": "No U.S. Plans to Stop Korea on Missile Test",
"url": "file:///C:/src/metromaps-heidi/data/2678.html"
 },
{
 "title": "North Korea Seeks Political Gain from Rocket Launch",
"url": "file:///C:/src/metromaps-heidi/data/2848.html"
 },
{
 "title": "North Korea Rocket Launch on Track",
"url": "file:///C:/src/metromaps-heidi/data/2788.html"
 },
{
 "title": "No U.S. Plans to Stop Korea on ICBM Test",
"url": "file:///C:/src/metromaps-heidi/data/2662.html"
 },
]},

7: {
 x: 0,
 y: 0,
 text: "travelers summit island embargo trinidad ",
 "date": "2009-04-19",
"lines": {1:2},
 "imp": "2",
 "articles": [{
 "title": "Rising Expectations on Cuba Follow Obama",
"url": "file:///C:/src/metromaps-heidi/data/3150.html"
 },
{
 "title": "The World: Flirting With Cuba, Courting a Hemisphere",
"url": "file:///C:/src/metromaps-heidi/data/3161.html"
 },
{
 "title": "Obama Opens Door to Cuba, but Only a Crack",
"url": "file:///C:/src/metromaps-heidi/data/3030.html"
 },
{
 "title": "At Summit Meeting, Cuba Will Be Absent, Not Forgotten",
"url": "file:///C:/src/metromaps-heidi/data/3112.html"
 },
{
 "title": "Latin American Leaders Aim to Redefine Relationship With United States",
"url": "file:///C:/src/metromaps-heidi/data/3098.html"
 },
]},

8: {
 x: 0,
 y: 0,
 text: "charges father journalists appeal spy ",
 "date": "2009-04-27",
"lines": {3:2},
 "imp": "2",
 "articles": [{
 "title": "Father Says U.S. Journalist Jailed in Iran &#x2018;Very Weak&#x2019;",
"url": "file:///C:/src/metromaps-heidi/data/3355.html"
 },
{
 "title": "Lawyer Defends Reporter in Iran",
"url": "file:///C:/src/metromaps-heidi/data/3701.html"
 },
{
 "title": "Journalist&#x2019;s Release Shows Divide Among Iran&#x2019;s Leaders",
"url": "file:///C:/src/metromaps-heidi/data/3726.html"
 },
{
 "title": "Iran Releases Journalist Convicted of Spying for U.S.",
"url": "file:///C:/src/metromaps-heidi/data/3720.html"
 },
{
 "title": "U.S. Journalist Jailed in Iran Ends Hunger Strike",
"url": "file:///C:/src/metromaps-heidi/data/3572.html"
 },
]},

9: {
 x: 0,
 y: 0,
 text: "arms capitalizing district valley buner ",
 "date": "2009-04-29",
"lines": {2:2},
 "imp": "2",
 "articles": [{
 "title": "Pakistan Claims to Retake Town From Taliban",
"url": "file:///C:/src/metromaps-heidi/data/3393.html"
 },
{
 "title": "Pakistani Army Tries to Stem Taliban Push",
"url": "file:///C:/src/metromaps-heidi/data/3348.html"
 },
{
 "title": "In a First, U.S. Provides Pakistan With Drone Data",
"url": "file:///C:/src/metromaps-heidi/data/3783.html"
 },
{
 "title": "Before U.S. Talks, Pakistan Claims Combat Gains",
"url": "file:///C:/src/metromaps-heidi/data/3592.html"
 },
{
 "title": "News Analysis: Now, U.S. Sees Pakistan as a Cause Distinct From Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/3460.html"
 },
]},

10: {
 x: 0,
 y: 0,
 text: "information investigations harsh prosecuted memo ",
 "date": "2009-05-09",
"lines": {6:2},
 "imp": "2",
 "articles": [{
 "title": "List Says Top Democrats Were Briefed on Interrogations",
"url": "file:///C:/src/metromaps-heidi/data/3675.html"
 },
{
 "title": "Released Memos Could Lead to More Disclosures",
"url": "file:///C:/src/metromaps-heidi/data/3111.html"
 },
{
 "title": "Obama Open to Inquiry in Interrogation Abuses",
"url": "file:///C:/src/metromaps-heidi/data/3216.html"
 },
{
 "title": "Pressure Grows to Investigate Interrogations",
"url": "file:///C:/src/metromaps-heidi/data/3201.html"
 },
{
 "title": "Report Outlines Medical Workers&#x2019; Role in Torture",
"url": "file:///C:/src/metromaps-heidi/data/2857.html"
 },
]},

11: {
 x: 0,
 y: 0,
 text: "settlements growth freezing abbas west ",
 "date": "2009-05-14",
"lines": {5:2},
 "imp": "2",
 "articles": [{
 "title": "U.S., Israel Tensions Rising Before Visit by Netanyahu",
"url": "file:///C:/src/metromaps-heidi/data/3797.html"
 },
{
 "title": "Israel Hopes for U.S. Settlement Shift",
"url": "file:///C:/src/metromaps-heidi/data/4157.html"
 },
{
 "title": "Israel Insists on Some Construction in West Bank Settlements",
"url": "file:///C:/src/metromaps-heidi/data/4187.html"
 },
{
 "title": "Jordan King Says Israel Must Accept Palestinian State",
"url": "file:///C:/src/metromaps-heidi/data/3808.html"
 },
{
 "title": "Obama Speech Will Seek to Alter Muslims&#x2019; View of U.S.",
"url": "file:///C:/src/metromaps-heidi/data/4356.html"
 },
]},

12: {
 x: 0,
 y: 0,
 text: "elections june disputed protesters demonstrators ",
 "date": "2009-06-20",
"lines": {3:3},
 "imp": "2",
 "articles": [{
 "title": "White House Resists Calls for a Tougher Stance on Iran",
"url": "file:///C:/src/metromaps-heidi/data/4769.html"
 },
{
 "title": "For Obama, Pressure to Strike Firmer Tone",
"url": "file:///C:/src/metromaps-heidi/data/4718.html"
 },
{
 "title": "Obama Condemns Iran&#x2019;s Iron Fist Against Protests",
"url": "file:///C:/src/metromaps-heidi/data/4870.html"
 },
{
 "title": "U.S. Officials to Continue to Engage Iran",
"url": "file:///C:/src/metromaps-heidi/data/4632.html"
 },
{
 "title": "U.S. Scrambles for Information on Iran",
"url": "file:///C:/src/metromaps-heidi/data/4840.html"
 },
]},

13: {
 x: 0,
 y: 0,
 text: "george disputed lives mitchell negotiator ",
 "date": "2009-06-29",
"lines": {5:3},
 "imp": "2",
 "articles": [{
 "title": "Israel May Shift on Settlements Freeze Amid Broader Effort",
"url": "file:///C:/src/metromaps-heidi/data/4986.html"
 },
{
 "title": "Diplomatic Memo: U.S. to Push Peace in Middle East Media Campaign",
"url": "file:///C:/src/metromaps-heidi/data/5944.html"
 },
{
 "title": "U.S. Rebukes Israel Over Settlement Plan",
"url": "file:///C:/src/metromaps-heidi/data/6892.html"
 },
{
 "title": "Letter from Europe: Telling Israel No: Obama's Bold Move",
"url": "file:///C:/src/metromaps-heidi/data/5814.html"
 },
{
 "title": "Israel Resists Pressure on Settlements",
"url": "file:///C:/src/metromaps-heidi/data/4919.html"
 },
]},

14: {
 x: 0,
 y: 0,
 text: "trip russian soviet biden georgia ",
 "date": "2009-07-03",
"lines": {1:3,4:3},
 "imp": "2",
 "articles": [{
 "title": "Russia Opens Route for U.S. to Fly Arms to Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/5110.html"
 },
{
 "title": "Georgians Hope U.S. Will Join Boundary Monitors",
"url": "file:///C:/src/metromaps-heidi/data/5586.html"
 },
{
 "title": "Heading to Russia, Obama Is Mindful of Its Power Equation",
"url": "file:///C:/src/metromaps-heidi/data/5153.html"
 },
{
 "title": "NATO Chief Urges Bigger European Role in Afghan War",
"url": "file:///C:/src/metromaps-heidi/data/5972.html"
 },
{
 "title": "In Russia, Obama&#x2019;s Star Power Does Not Translate",
"url": "file:///C:/src/metromaps-heidi/data/5224.html"
 },
]},

15: {
 x: 0,
 y: 0,
 text: "evidence federal justice attack held ",
 "date": "2009-07-29",
"lines": {6:3},
 "imp": "2",
 "articles": [{
 "title": "Obama Faces Court Test Over Detainee",
"url": "file:///C:/src/metromaps-heidi/data/5824.html"
 },
{
 "title": "U.S. to Expand Review of Detainees in Afghan Prison",
"url": "file:///C:/src/metromaps-heidi/data/7112.html"
 },
{
 "title": "U.S. May Permit 9/11 Guilty Pleas in Capital Cases",
"url": "file:///C:/src/metromaps-heidi/data/4429.html"
 },
{
 "title": "Obama Faces Hurdles in Closing Guant&#xE1;namo",
"url": "file:///C:/src/metromaps-heidi/data/5395.html"
 },
{
 "title": "6 Detainees Are Freed as Questions Linger",
"url": "file:///C:/src/metromaps-heidi/data/4573.html"
 },
]},

16: {
 x: 0,
 y: 0,
 text: "elections deploy iraqis mcchrystal mission ",
 "date": "2009-08-24",
"lines": {2:3},
 "imp": "2",
 "articles": [{
 "title": "U.S. Military Says Its Force in Afghanistan Is Insufficient",
"url": "file:///C:/src/metromaps-heidi/data/6543.html"
 },
{
 "title": "Pakistan Objects to U.S. Expansion in Afghan War",
"url": "file:///C:/src/metromaps-heidi/data/5616.html"
 },
{
 "title": "More Leeway for New U.S. Commander in Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/4547.html"
 },
{
 "title": "American Antiwar Movement Plans an Autumn Campaign Against Policies on Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/6733.html"
 },
{
 "title": "Books of The Times: The Choices That Closed a Window Into Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/5411.html"
 },
]},

17: {
 x: 0,
 y: 0,
 text: "range shields poland afghanistan missiles ",
 "date": "2009-09-18",
"lines": {1:4},
 "imp": "2",
 "articles": [{
 "title": "Putin Applauds &#x2018;Brave&#x2019; U.S. Decision on Missile Defense",
"url": "file:///C:/src/metromaps-heidi/data/7258.html"
 },
{
 "title": "Czechs Accept Modified Missile Shield Role",
"url": "file:///C:/src/metromaps-heidi/data/8222.html"
 },
{
 "title": "Poland Agrees to Accept U.S. Missile Interceptors",
"url": "file:///C:/src/metromaps-heidi/data/8162.html"
 },
{
 "title": "Russia Says It Won&#x2019;t Deploy Missiles Near Poland",
"url": "file:///C:/src/metromaps-heidi/data/7296.html"
 },
{
 "title": "White House to Scrap Bush&#x2019;s Approach to Missile Shield",
"url": "file:///C:/src/metromaps-heidi/data/7227.html"
 },
]},

18: {
 x: 0,
 y: 0,
 text: "afghanistan secretary china elections european ",
 "date": "2009-09-19",
"lines": {4:4},
 "imp": "2",
 "articles": [{
 "title": "Good Will for Obama, but Few Policy Benefits",
"url": "file:///C:/src/metromaps-heidi/data/7286.html"
 },
{
 "title": "Top Palestinian Rules Out Race for Re-election",
"url": "file:///C:/src/metromaps-heidi/data/8617.html"
 },
{
 "title": "Lack of Progress in Mideast Defies Obama&#x2019;s Hopes",
"url": "file:///C:/src/metromaps-heidi/data/7266.html"
 },
{
 "title": "France Wades Into Bog of North Korean Diplomacy",
"url": "file:///C:/src/metromaps-heidi/data/8546.html"
 },
{
 "title": "Iran Agrees to More Nuclear Talks With U.S. and Allies",
"url": "file:///C:/src/metromaps-heidi/data/7634.html"
 },
]},

19: {
 x: 0,
 y: 0,
 text: "western karzai victory fraud round ",
 "date": "2009-10-25",
"lines": {2:4},
 "imp": "2",
 "articles": [{
 "title": "Karzai Agrees to Nov. 7 Runoff in Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/8127.html"
 },
{
 "title": "The Great American Arm-Twist in Afghanistan",
"url": "file:///C:/src/metromaps-heidi/data/8265.html"
 },
{
 "title": "Karzai Aide Says Afghan Runoff Vote Appears Likely",
"url": "file:///C:/src/metromaps-heidi/data/8016.html"
 },
{
 "title": "Abdullah Will Quit Afghan Election, Officials Say",
"url": "file:///C:/src/metromaps-heidi/data/8461.html"
 },
{
 "title": "Karzai Rival Says He Is Withdrawing From Runoff",
"url": "file:///C:/src/metromaps-heidi/data/8473.html"
 },
]},

20: {
 x: 0,
 y: 0,
 text: "abbas hamas west building peacefully ",
 "date": "2009-11-06",
"lines": {5:4},
 "imp": "2",
 "articles": [{
 "title": "Top Palestinian Rules Out Race for Re-election",
"url": "file:///C:/src/metromaps-heidi/data/8617.html"
 },
{
 "title": "Collapse Feared for Palestinian Authority if Abbas Resigns",
"url": "file:///C:/src/metromaps-heidi/data/8704.html"
 },
{
 "title": "Lack of Progress in Mideast Defies Obama&#x2019;s Hopes",
"url": "file:///C:/src/metromaps-heidi/data/7266.html"
 },
{
 "title": "Memo From Riyadh: Saudi Arabia and Egypt Fret as Influence Fades",
"url": "file:///C:/src/metromaps-heidi/data/8759.html"
 },
{
 "title": "Obama Will Meet With Mideast Leaders",
"url": "file:///C:/src/metromaps-heidi/data/7295.html"
 },
]}
}}}*/
/*var data = {
 "metromap": {
 "name": "OJ Simpson",
 "lines": {
1:
 {
 "name": "simpson, police, murder, trial, cochran, ",
 "imp": "1",
 "nodes":[],
 y: 0 },
 2:
 {
 "name": "rate, cbs, president, advertisers, viewers, ",
 "imp": "1",
 "nodes":[],
 y: 0 },
 3:
 {
 "name": "clinton, center, imprisonment, elliott, stuart, ",
 "imp": "1",
 "nodes":[],
 y: 0 },
 4:
 {
 "name": "left, hair, amendment, nigger, entering, ",
 "imp": "1",
 "nodes":[],
 y: 0 },
 },
 "events": {

1: {
 x: 0,
 y: 0,
 text: "wife angeles former charge televised ",
 "date": "1994-06-19",
"lines": {1:1},
 "imp": "3",
 "articles": [{
 "title": "Simpson, Under Suicide Watch, Is Jailed on 2 Murder Charges",
"url": "file:///C:/src/metromaps-heidi/dataOJ/15.html"
 },
{
 "title": "Nicole Brown Simpson: Slain At the Dawn of a Better Life",
"url": "file:///C:/src/metromaps-heidi/dataOJ/40.html"
 },
{
 "title": "A Troubled Life Unfolds: A special report.; Simpson: 'Baddest Cat,' a Polished Star, or Both?",
"url": "file:///C:/src/metromaps-heidi/dataOJ/54.html"
 },
{
 "title": "Simpson Is Charged, Chased, Arrested",
"url": "file:///C:/src/metromaps-heidi/dataOJ/8.html"
 },
{
 "title": "A Lifelong Loyalty, True to the End",
"url": "file:///C:/src/metromaps-heidi/dataOJ/16.html"
 },
]},

2: {
 x: 0,
 y: 0,
 text: "wife angeles former los lawyers ",
 "date": "1994-07-10",
"lines": {4:1},
 "imp": "3",
 "articles": [{
 "title": "In the Simpson Case, the Easy Part Is Over",
"url": "file:///C:/src/metromaps-heidi/dataOJ/108.html"
 },
{
 "title": "Simpson Lawyers Seek to Exclude Bloody Evidence Found at Home",
"url": "file:///C:/src/metromaps-heidi/dataOJ/72.html"
 },
{
 "title": "Simpson Ordered to Stand Trial In Slaying of Ex-Wife and Friend",
"url": "file:///C:/src/metromaps-heidi/dataOJ/101.html"
 },
{
 "title": "Debating Death Penalty in Simpson Case",
"url": "file:///C:/src/metromaps-heidi/dataOJ/125.html"
 },
{
 "title": "Prosecutors Use Testimony of 2 Men to Suggest Simpson Had Time to Commit Killings",
"url": "file:///C:/src/metromaps-heidi/dataOJ/92.html"
 },
]},

3: {
 x: 0,
 y: 0,
 text: "season abc executive televised cbs ",
 "date": "1994-09-19",
"lines": {2:1},
 "imp": "3",
 "articles": [{
 "title": "Big TV Networks in Turmoil As the New Season Begins",
"url": "file:///C:/src/metromaps-heidi/dataOJ/232.html"
 },
{
 "title": "TV News Magazine Shows Are Crowding One Another",
"url": "file:///C:/src/metromaps-heidi/dataOJ/306.html"
 },
{
 "title": "A New Species of Couch Potato Takes Root",
"url": "file:///C:/src/metromaps-heidi/dataOJ/325.html"
 },
{
 "title": "Everywhere You Look, 'Crypt' and More 'Crypt'",
"url": "file:///C:/src/metromaps-heidi/dataOJ/210.html"
 },
{
 "title": "25 Years Later, Monday Night Is a Fall Classic",
"url": "file:///C:/src/metromaps-heidi/dataOJ/212.html"
 },
]},

4: {
 x: 0,
 y: 0,
 text: "questions selected media potentially interview ",
 "date": "1994-10-10",
"lines": {1:2,4:2},
 "imp": "3",
 "articles": [{
 "title": "In Simpson Subtext, the Defense Tries to Put the Los Angeles Police on Trial",
"url": "file:///C:/src/metromaps-heidi/dataOJ/276.html"
 },
{
 "title": "Judge Rejects Barrage of Objections by Simpson's Lawyers",
"url": "file:///C:/src/metromaps-heidi/dataOJ/267.html"
 },
{
 "title": "Simpson Trial Judge Rules For Quick Selection of Jury",
"url": "file:///C:/src/metromaps-heidi/dataOJ/251.html"
 },
{
 "title": "Saber Rattling",
"url": "file:///C:/src/metromaps-heidi/dataOJ/290.html"
 },
{
 "title": "Simpson Judge May Restrict Coverage",
"url": "file:///C:/src/metromaps-heidi/dataOJ/241.html"
 },
]},

5: {
 x: 0,
 y: 0,
 text: "including cross examiners walk reply ",
 "date": "1995-03-10",
"lines": {1:3,4:3},
 "imp": "3",
 "articles": [{
 "title": "'Nervous' Detective Testifies on Simpson",
"url": "file:///C:/src/metromaps-heidi/dataOJ/538.html"
 },
{
 "title": "Simpson Judge Delays Trial Opening and Will Allow Questioning of Detective on Bias",
"url": "file:///C:/src/metromaps-heidi/dataOJ/434.html"
 },
{
 "title": "Simpson Team Begins Sketching Its Case for a Police Conspiracy",
"url": "file:///C:/src/metromaps-heidi/dataOJ/544.html"
 },
{
 "title": "Simpson Dream Testimony Stirs Uproar",
"url": "file:///C:/src/metromaps-heidi/dataOJ/462.html"
 },
{
 "title": "PROSECUTORS WIN KEY SIMPSON FIGHT",
"url": "file:///C:/src/metromaps-heidi/dataOJ/418.html"
 },
]},

6: {
 x: 0,
 y: 0,
 text: "broadcast cbs president program network ",
 "date": "1995-03-27",
"lines": {2:2},
 "imp": "3",
 "articles": [{
 "title": "'Nightline,' at 15, Is Now Stronger Than Ever",
"url": "file:///C:/src/metromaps-heidi/dataOJ/574.html"
 },
{
 "title": "Cable Ratings at High, Aided by Simpson Trial",
"url": "file:///C:/src/metromaps-heidi/dataOJ/575.html"
 },
{
 "title": "Cable Picks Up Viewers the Networks Cast Adrift",
"url": "file:///C:/src/metromaps-heidi/dataOJ/727.html"
 },
{
 "title": "The issue is not the future of Connie Chung, but the future of evening newscasts as we know them.",
"url": "file:///C:/src/metromaps-heidi/dataOJ/712.html"
 },
{
 "title": "CBS Profits Off 68% in Quarter; Weakness in TV Lineup Is Cited",
"url": "file:///C:/src/metromaps-heidi/dataOJ/616.html"
 },
]},

7: {
 x: 0,
 y: 0,
 text: "deputy dismissed panel scheck bags ",
 "date": "1995-04-04",
"lines": {1:4,4:4},
 "imp": "3",
 "articles": [{
 "title": "Focus Shifts to Physical Evidence in Simpson Case",
"url": "file:///C:/src/metromaps-heidi/dataOJ/593.html"
 },
{
 "title": "Simpson's Lawyers Attack Handling of Blood Samples",
"url": "file:///C:/src/metromaps-heidi/dataOJ/622.html"
 },
{
 "title": "Hearing Asked on Simpson Prosecution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/617.html"
 },
{
 "title": "Strain of Simpson Trial Takes Toll on One Juror",
"url": "file:///C:/src/metromaps-heidi/dataOJ/642.html"
 },
{
 "title": "Simpson Prosecutors Get Back to the Bedrock Evidence",
"url": "file:///C:/src/metromaps-heidi/dataOJ/636.html"
 },
]},

8: {
 x: 0,
 y: 0,
 text: "district conference professor rarely leather ",
 "date": "1995-06-23",
"lines": {1:5},
 "imp": "3",
 "articles": [{
 "title": "New-Found Simpson Photos May Bolster Prosecution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/767.html"
 },
{
 "title": "New-Found Simpson Photos May Bolster Prosecution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/768.html"
 },
{
 "title": "New-Found Simpson Photos May Bolster Prosecution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/769.html"
 },
{
 "title": "New-Found Simpson Photos May Bolster Prosecution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/770.html"
 },
{
 "title": "Judge Ito to Open Files On 10 Dismissed Jurors",
"url": "file:///C:/src/metromaps-heidi/dataOJ/772.html"
 },
]},

9: {
 x: 0,
 y: 0,
 text: "mark district detectives fuhrman words ",
 "date": "1995-08-30",
"lines": {4:5},
 "imp": "3",
 "articles": [{
 "title": "Racial Epithets by Detective Fill Simpson Courtroom",
"url": "file:///C:/src/metromaps-heidi/dataOJ/903.html"
 },
{
 "title": "What the Tapes in the Simpson Case Say",
"url": "file:///C:/src/metromaps-heidi/dataOJ/891.html"
 },
{
 "title": "Simpson Witness May Be Forced to Testify",
"url": "file:///C:/src/metromaps-heidi/dataOJ/856.html"
 },
{
 "title": "Judge Ito Says Simpson Detective Doesn't Have to Face Jury Again",
"url": "file:///C:/src/metromaps-heidi/dataOJ/920.html"
 },
{
 "title": "In Mounting Defense, O. J. Simpson's Lawyers Plan to Focus on 3 Themes",
"url": "file:///C:/src/metromaps-heidi/dataOJ/806.html"
 },
]},

10: {
 x: 0,
 y: 0,
 text: "verdict system guilty reason view ",
 "date": "1995-10-04",
"lines": {1:6,4:6},
 "imp": "3",
 "articles": [{
 "title": "Jury Clears Simpson in Double Murder; Spellbound Nation Divides on Verdict",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1018.html"
 },
{
 "title": "Jury Clears Simpson in Double Murder; Spellbound Nation Divides on Verdict",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1009.html"
 },
{
 "title": "THE SIMPSON TRIAL: THE OVERVIEW Verdict Is Reached in Simpson's Trial; Ito Defers Announcement Until Today; Jurors Are Out for Less Than Four Hours",
"url": "file:///C:/src/metromaps-heidi/dataOJ/995.html"
 },
{
 "title": "THE SIMPSON TRIAL: THE OVERVIEWVerdict Is Reached in Simpson's Trial; Ito Defers Announcement Until Today; Jurors Are Out for Less Than Four Hours",
"url": "file:///C:/src/metromaps-heidi/dataOJ/990.html"
 },
{
 "title": "Blacks Look at Simpson In the Context of the Past",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1104.html"
 },
]},

11: {
 x: 0,
 y: 0,
 text: "system watching view johnnie million ",
 "date": "1995-10-05",
"lines": {3:1},
 "imp": "3",
 "articles": [{
 "title": "More Blacks in Their 20's Have Trouble With the Law",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1036.html"
 },
{
 "title": "More Blacks in Their 20's Have Trouble With the Law",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1053.html"
 },
{
 "title": "Jury Clears Simpson in Double Murder; Spellbound Nation Divides on Verdict",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1018.html"
 },
{
 "title": "Jury Clears Simpson in Double Murder; Spellbound Nation Divides on Verdict",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1009.html"
 },
{
 "title": "Simpson Cancels TV Interview, But Talks of Life Since Verdict",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1132.html"
 },
]},

12: {
 x: 0,
 y: 0,
 text: "verdict view closely million united ",
 "date": "1995-10-11",
"lines": {2:3},
 "imp": "3",
 "articles": [{
 "title": "Simpson Interview Drawing Interest, and Protest",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1129.html"
 },
{
 "title": "Simpson Interview Drawing Interest, and Protest",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1123.html"
 },
{
 "title": "Bochco Tests America's New Legal Savvy",
"url": "file:///C:/src/metromaps-heidi/dataOJ/968.html"
 },
{
 "title": "Bochco Tests America's New Legal Savvy",
"url": "file:///C:/src/metromaps-heidi/dataOJ/971.html"
 },
{
 "title": "Late Meetings Led to Cancellation",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1140.html"
 },
]},

13: {
 x: 0,
 y: 0,
 text: "stopped forcefully remains democrat powell ",
 "date": "1995-10-17",
"lines": {3:2},
 "imp": "3",
 "articles": [{
 "title": "Unimpressed by '96 Flock, Some Voters Are in No Hurry",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1143.html"
 },
{
 "title": "Unimpressed by '96 Flock, Some Voters Are in No Hurry",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1145.html"
 },
{
 "title": "One Campaign Over, Another to Begin?",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1222.html"
 },
{
 "title": "One Campaign Over, Another to Begin?",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1216.html"
 },
{
 "title": "Ardor and Ambiguity",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1186.html"
 },
]},


14: {
 x: 0,
 y: 0,
 text: "self accused refusing cost individually ",
 "date": "1995-10-22",
"lines": {1:7},
 "imp": "3",
 "articles": [{
 "title": "In Civil Court, a Second Chance at Retribution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1214.html"
 },
{
 "title": "In Civil Court, a Second Chance at Retribution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1220.html"
 },
{
 "title": "Simpson Refusal to Testify Could Prove Costly",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1231.html"
 },
{
 "title": "Simpson Refusal to Testify Could Prove Costly",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1233.html"
 },
{
 "title": "Essay;The Newsmakers",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1201.html"
 },
]},

15: {
 x: 0,
 y: 0,
 text: "culpable civil suit death public ",
 "date": "1995-10-22",
"lines": {4:7},
 "imp": "3",
 "articles": [{
 "title": "In Civil Court, a Second Chance at Retribution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1220.html"
 },
{
 "title": "In Civil Court, a Second Chance at Retribution",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1214.html"
 },
{
 "title": "Under Fire, Jury System Faces Overhaul",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1254.html"
 },
{
 "title": "New Testimony About Simpson Brings Surprise",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1306.html"
 },
{
 "title": "Simpson Loses Bid to Keep Secret the Transcript of a Deposition",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1275.html"
 },
]},


16: {
 x: 0,
 y: 0,
 text: "successfully average rerun nielsen million ",
 "date": "1995-10-25",
"lines": {2:4},
 "imp": "3",
 "articles": [{
 "title": "Cable TV Continues Its Steady Drain Of Network Viewers",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1239.html"
 },
{
 "title": "Cable TV Continues Its Steady Drain Of Network Viewers",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1238.html"
 },
{
 "title": "NBC Confronts the 'What If's' Of Simpson Coup That Wasn't",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1173.html"
 },
{
 "title": "NBC Confronts the 'What If's' Of Simpson Coup That Wasn't",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1168.html"
 },
{
 "title": "New TV Shows: Not a Single Hit",
"url": "file:///C:/src/metromaps-heidi/dataOJ/1241.html"
 },
]},
 }
 }
 }

initializeZoom();
initializeLayers(data);
initializeTicks();
initializeArticleMenu();*/

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

function addHoverCaptionExpander(caption, originalWidth, text) {
	caption.on('mouseenter', function() {
		caption.setWidth(500);
		caption.setText("\n" + text);
		layer0.draw();
	});
	caption.on('mouseleave', function() {
		caption.setWidth(originalWidth);
		caption.setText("\n" + text.slice(0,5) + "...");
		layer0.draw();
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