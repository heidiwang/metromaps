/***********************************
CONSTANTS & GLOBALS
***********************************/
var stage;
var tickStage;
var data = {};
var allLines = [];
var allNodes = [];
var lines = []; // currently displayed lines
var nodes = []; // currently displayed nodes
var currentLayer = new Kinetic.Layer();
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 530;

function formSubmit() {

	/*
	//TODO: add in the dynamic json
	
	var filename = ($('#filename_input')).val() + ".json";
	var data = {};
	
	$.getJSON(filename, function(JSONdata) {
		data = JSONdata;
		...
	}).error(function() {
		document.getElementById("container").innerHTML = "File not found";
	});
	*/
	
	var data = { 
		"name": "Lord of the Rings",
		"lines": 
			[{
				"id": 0,
				"name": "bilbo, birthday, hobbits, passed, boats, ", 
				"imp": "1", 
				"layerId": 0,
				"nodes":[], 
				"y": 0
			},{ "id": 1,
				"name": "shire, hobbits, friends, baggins, door, ", 
				"imp": "1", 
				"layerId": 0,
				"nodes":[], 
				"y": 0 },
			{ "id": 2,
				"name": "hobbits, passed, boats, dark, answered, ", 
				"imp": "1", 
				"layerId": 0,
				"nodes":[], 
				"y": 0 },
			{ "id": 3,
				"name": "hobbits, passed, road, dark, left, ", 
				"imp": "1", 
				"layerId": 0,
				"nodes":[], 
				"y": 0 },
			{ "id": 4,
				"name": "bilbo, bag, birthday, shire, hobbits, ", 
				"imp": "1", 
				"layerId": 0,
				"nodes":[], 
				"y": 0 },
			{ "id": 5,
				"name": "test test test", 
				"imp": "1", 
				"layerId": 1,
				"parentLine": 2,
				"nodes":[], 
				"y": 0 },
			{ "id": 6,
				"name": "test2 test2 test2", 
				"imp": "1", 
				"layerId": 1,
				"parentLine": 2,
				"nodes":[], 
				"y": 0 }
		], 
		"events": 
			[
				{ "id": 0,
				 "x": 0, 
				 "y": 0, 
				 "text": "hall trees forest light land ", 
				 "date": "2000-09-16",
				"lines": [4], 
				 "imp": "3",
				 "articles": [{
				 "title": "everlasting  groan  of  overburdened stone. And  so  at the last Gwaihir the Windlord found me again, and he took me up and bore me away.  Ever am I fated to be your burden, friend at need, I said.",
				"url": "" 
				 },
				{
				 "title": "Please, Treebeard, he said,  could I  ask  you  something?  Why  did Celeborn  warn  us  against  your forest?  He  told us  not to  risk getting entangled in it. Hmm,  did he now? rumbled  Tree",
				"url": "" 
				 },
				{
				 "title": "Taur-na-neldor! It was more than my desire. To the pine-trees upon the  highland of  Dorthonion  I climbed  in  the Winter. Ah! the wind and the whiteness and the black  branches  of  Winter upon Orod",
				"url": "" 
				 },
				{
				 "title": "used to rouse up in winter; but of late he has been  too drowsy to walk  far even then.  Skinbark  lived on the mountain-slopes west of Isengard. That is where the worst  trouble  has been. He was wou",
				"url": "" 
				 },
				{
				 "title": "I  did not say so, said Gandalf. Who knows?  Have patience. Go where you must go, and hope! To Edoras! I go thither also. It is a long  way for  a man to walk, young or old,  said Aragorn. I fe",
				"url": "/258.html" 
				 }
				]},
				{ "id": 1,
								"x": 0, 
								"y": 0, 
								"text": "wizard heard carefully vanished elves ", 
								"date": "2000-01-04",
								"lines": [4], 
								"imp": "2",
								"articles": [{
									"title": "Chapter 3. Three is Company You ought to go quietly, and you ought to  go soon, said Gandalf. Two or three weeks had passed, and still Frodo made  no sign of getting ready to go. I know. But it is ",
									"url": "/25.html" },
									{
									"title": "they do things proper at Bag End. Our  Sam says that everyones going to be invited to the party, and theres  going to be presents, mark you,  presents for all - this very month a",
									"url": "/3.html"},
									{
									"title": "friends! The enemy has many spies and many ways of hearing. Suddenly he  stopped as if  listening.  Frodo became aware that all was very quiet,  inside and  outside. Gandalf  crept to one side of  th",
									"url": "/24.html" },
									{
									"title": "unrevealed plot by Gandalf. Though he kept himself very quiet and did not go about by day, it was well known that he was hiding up in the  Bag End. But however a removal might  fit in with the  desi",
									"url": "/26.html" 
									},
									{
									"title": "maybe he sees things that aint there. But  this  one was as big  as an elm tree, and walking - walking seven yards to a stride, if it was an inch. Then I bet it wasnt an inch. What he saw       ",
									"url": "/14.html" }
								]},
				{ "id": 2,
								"x": 0, 
								"y": 0, 
								"text": "guests golden ridiculous pavilion additions ", 
								"date": "2000-01-07",
								"lines": [0, 4], 
								"imp": "2",
								"articles": [{
									"title": "immensely fond  of  you all, and that eleventy-one years is too short a time to live among such  excellent and  admirable hobbits.                 Tremendous outburst of approval.   dont know half o",
									"url": "/6.html"},
									{
									"title": "by the hobbits one Gross, though  the  word was not considered proper to use of people. and  the  guests were selected  from  all  the families to which Bilbo and Frodo were related, with  the additi",
									"url": "/5.html" },
									{
									"title": "front door, covered with ropes and poles for tents  and pavilions. A special entrance  was cut into the bank leading to  the road, and wide steps  and  a large white gate were built there. The three h",
									"url": "/4.html" },
									{
									"title": "they do things proper at Bag End. Our  Sam says that everyones    going to be invited to the party, and theres  going to be presents, mark you,  presents for all - this very month a",
									"url": "/3.html" },
									{
									"title": "round his  waist a  worn leather  belt.  On it  he  hung a short sword in  a battered  black-leather  scabbard.  From  a  locked  drawer,   smelling   of moth-balls, he took out an old cloak and hood.",
									"url": "/7.html"}
								]},
				{ "id": 3,
							"x": 0, 
				 "y": 0, 
				 "text": "pippin land hill night packed ", 
				 "date": "2000-01-28",
				"lines": [3], 
				 "imp": "1",
				 "articles": [{
				 "title": "fairly easy. I shall  get  myself a bit  into  training,  too, he said, looking at himself  in  a dusty mirror in the  half-empty  hall.  He  had  not done any strenuous walking for a long time, and",
				"url": "/27.html" 
				 },
				{
				 "title": "hedge at the bottom and took to the fields, passing into the darkness like a rustle in the grasses. At the bottom of the  Hill  on its western  side they came  to the gate opening on to a  narrow lane",
				"url": "/28.html" 
				 },
				{
				 "title": "No!  I could  not! he said  to  himself.  It is one thing to take my young friends walking over the Shire with me, until we are hungry and weary, and food  and  bed are  sweet.  To  take them into ",
				"url": "/37.html" 
				 },
				{
				 "title": "them when the fire had died away. A fox passing through the wood on business of his own stopped several minutes and sniffed. Hobbits! he thought. Well, what next? I have heard of strange doings in ",
				"url": "/29.html" 
				 },
				{
				 "title": "Mirkwood,  and that if you let it, it  might take you to the Lonely Mountain or  even  further and to worse places?  He  used to say  that  on  the path outside the  front door at  Bag End, especiall",
				"url": "/30.html" 
				 }
				]},
				{ "id": 4,
				 "x": 0, 
				 "y": 0, 
				 "text": "pippin rider grass expected gildor ", 
				 "date": "2000-02-06",
				"lines": [1], 
				"imp": "2",
				"articles": [{
				 "title": "through  the lands.  The Wandering Companies shall know of your journey, and those that have power for good shall be on the watch. I name you Elf-friend; and  may the stars shine upon the end  of your",
				 "url": "/36.html" 
				 },
				{
				 "title": "The  woods on either side became denser; the trees were now younger and thicker;  and as the lane went lower, running down into a fold of the hills, there were many deep brakes of hazel on the rising ",
				"url": "/34.html" 
				 },
				{
				 "title": "doubt that you will find  what you seek, or accomplish what  you intend,  or that you will ever return. Is not that so? It is, said Frodo; but I thought my going was a secret known only to Gandalf",
				"url": "/35.html" 
				 },
				{
				 "title": "O stars that in the Sunless Year With shining hand by her were sawn, In windy fields now bright and clear We see your silver blossom blown! O Elbereth! Gilthoniel! We still remember, we who dwell In t",
				"url": "/33.html" 
				 },
				{
				 "title": "No!  I could  not! he said  to  himself.  It is one thing to take my young friends walking over the Shire with me, until we are hungry and weary, and food  and  bed are  sweet.  To  take them into ",
				"url": "/37.html" 
				 }
				]},
				{ "id": 5,
				 "x": 0, 
				 "y": 0, 
				 "text": "path pony forest damp merry ", 
				 "date": "2000-02-22",
				"lines": [2], 
				 "imp": "3",
				 "articles": [{
				 "title": "The others looked in the  direction  that  Merry  pointed out, but they could see little but mists over the damp and  deep-cut valley; and beyond it the southern half of the Forest faded from view. Th",
				"url": "/52.html" 
				 },
				{
				 "title": "Pippin noticed it. It  has not taken you long to lose  us, he said. But at that moment Merry gave a whistle of relief and pointed ahead. Well, well!  he  said. These trees      do    shift.  Ther",
				"url": "/51.html" 
				 },
				{
				 "title": "soon be back on it and going as fast as we can. Good-bye! they cried, and rode down the slope and disappeared from Fredegars sight into the tunnel. It  was  dark and  damp. At the far  end it  was",
				"url": "/50.html" 
				 },
				{
				 "title": "Bridge.  His task, according to the original plans  of the conspirators, was to stay  behind and deal with inquisitive folk,  and  to keep up as long  as possible the  pretence that Mr. Baggins  was s",
				"url": "/49.html" 
				 },
				{
				 "title": "was called) was still acknowledged by the farmers between Stock  and Rushey. But  most of the folk of the old Shire regarded the Bucklanders as peculiar, half foreigners as it were. Though, as a matte",
				"url": "/44.html" 
				 }
				]},
				{ "id": 6,
				 "x": 0, 
				 "y": 0, 
				 "text": "hopes black leave helped nob ", 
				 "date": "2000-03-21",
				"lines": [1], 
				 "imp": "2",
				 "articles": [{
				 "title": "There! he  cried  after  a moment, drawing his hand  across his brow. Perhaps I know  more about these pursuers than you  do.  You fear them, but you do not fear them enough,  yet. Tomorrow you wil",
				"url": "/80.html" 
				 },
				{
				 "title": "Ah! said Mr. Butterbur. Then your right name is Baggins? It is, said Frodo, and you had better give me that  letter  at once, and explain  why  you  never sent it.  Thats  what you came  to te",
				"url": "/81.html" 
				 },
				{
				 "title": "you. You might have done in the real Strider and took his clothes. What have you to say to that? That you are a stout fellow, answered  Strider;  but I am  afraid my only answer to you, Sam Gamgee",
				"url": "/83.html" 
				 },
				{
				 "title": "Baggins - Underhill, I should say! Good night -  now, bless me! Wheres your Mr. Brandybuck? I dont know, said Frodo with sudden anxiety. They had  forgotten all about  Merry, and it was  getting ",
				"url": "/82.html" 
				 },
				{
				 "title": "many  wild  and wary  things and I can usually avoid being  seen, if I wish. Now, I was behind the hedge this evening on the Road west of Bree, when four hobbits  came out  of the Downlands. I need no",
				"url": "/79.html" 
				 }
				]},
				{ "id": 7,
				 "x": 0, 
				 "y": 0, 
				 "text": "white moment glorfindel horse elf ", 
				 "date": "2000-04-15",
				"lines": [3], 
				 "imp": "2",
				 "articles": [{
				 "title": "time nearly asleep on their stumbling legs; and  even Strider seemed  by the sag of his shoulders to be weary. Frodo sat upon the horse in a dark dream. They  cast  themselves  down  in  the  heather ",
				"url": "/105.html" 
				 },
				{
				 "title": "rocks  away  on the left four other  Riders came flying.  Two  rode  towards Frodo: two  galloped madly towards  the Ford  to  cut  off  his escape. They seemed to him to run like the wind and to grow",
				"url": "/106.html" 
				 },
				{
				 "title": "all see their horses? Because  they are real horses; just as the black robes are real  robes that they wear to give shape  to their  nothingness when  they have dealings with the living. Then  why",
				"url": "/109.html" 
				 },
				{
				 "title": "Gandalf smiled. I have heard all about  Sam, he said. He has no more doubts now. I am glad, said Frodo. For I have become very fond of Strider. Well, fond   is not the right word.  I mean he is",
				"url": "/108.html" 
				 },
				{
				 "title": "standing guard beside you. You were  pale and cold, and they feared that you were  dead,  or  worse.  Elronds folk met them, carrying you slowly towards Rivendell. Who made the flood? asked Frodo.",
				"url": "/110.html" 
				 }
				]},
				{ "id": 8,
				 "x": 0, 
				 "y": 0, 
				 "text": "gimli trees stone stood legolas ", 
				 "date": "2000-06-05",
				"lines": [4], 
				 "imp": "2",
				 "articles": [{
				 "title": "Those were happier times. Now let us go! He strode  forward  and  set his foot  on the lowest  step. But at that moment several things happened. Frodo felt something seize him by the ankle, and he fe",
				"url": "/156.html" 
				 },
				{
				 "title": "and brought no animal, least of  all  this one that Sam is fond of, if I had had my way. I feared all along that we should be obliged to take this road. The day was drawing to its end, and cold stars",
				"url": "/153.html" 
				 },
				{
				 "title": "well that I  did so, for now we have several miles less to cross, and  haste is needed. Let us go!  I do not know which to hope, said  Boromir grimly: that Gandalf will find what he seeks, or that",
				"url": "/152.html" 
				 },
				{
				 "title": "howling of the wolves was now all round them, sometimes nearer and sometimes further off.  In the dead  of the night many shining eyes were  seen peering over the brow of the  hill. Some advanced almo",
				"url": "/151.html" 
				 },
				{
				 "title": "if he did not come. That  animal can nearly talk, he said, and  would talk, if he stayed here  much longer. He gave me a  look as plain as Mr. Pippin could speak it: if you dont  let me go  with y",
				"url": "/141.html" 
				 }
				]},
				{ "id": 9,
				 "x": 0, 
				 "y": 0, 
				 "text": "ship shore land trees gray ", 
				 "date": "2000-07-09",
				"lines": [0], 
				 "imp": "1",
				 "articles": [{
				 "title": "walk among the stones or the trees. You are indeed high in the favour of the Lady! For she herself and her maidens wove this stuff; and never before have we clad strangers in the garb of our own peopl",
				"url": "/190.html" 
				 },
				{
				 "title": "you desire something that I could give? Name it, I bid you! You shall not be the only guest without a gift. There  is  nothing,  Lady  Galadriel,  said  Gimli,  bowing  low  and stammering. Nothin",
				"url": "/193.html" 
				 },
				{
				 "title": "Nambril! Nai hiruvalyl Valimar. Nai elyl hiruva. Nambril! Ah! like gold fall the leaves in the  wind,  long years numberless  as the  wings of trees!  The long years have passed like  swift draughts ",
				"url": "/194.html" 
				 },
				{
				 "title": "under his eyes upon a table, and yet remote. There was no sound, only bright living images.  The world  seemed to have shrunk  and  fallen silent. He was sitting upon the Seat of Seeing, on Amon Hen, ",
				"url": "/206.html" 
				 },
				{
				 "title": "His  own  plan, while Gandalf remained with  them, had been to go  with Boromir, and with his sword help to deliver Gondor. For he believed that the message of the dreams was a summons, and that the h",
				"url": "/189.html" 
				 }
				]},
				{ "id": 10,
				 "x": 0, 
				 "y": 0, 
				 "text": "sat boromir trees water eye ", 
				 "date": "2000-07-09",
				"lines": [2], 
				 "imp": "2",
				 "articles": [{
				 "title": "Chapter 10. The Breaking of the Fellowship Aragorn led them to  the right  arm of the River. Here upon its western side under the shadow of Tol Brandir a green lawn ran down to the water from the feet",
				"url": "/203.html" 
				 },
				{
				 "title": "wore, the silent wardens  of a long-vanished kingdom. Awe and fear fell upon Frodo,  and he  cowered down, shutting his eyes and not daring to look up as the boat drew  near. Even Boromir bowed  his h",
				"url": "/202.html" 
				 },
				{
				 "title": "When the day came the mood of the world about them had become soft  and sad. Slowly  the dawn grew  to a  pale light, diffused and shadowless. There was mist on the River, and white fog  swathed the s",
				"url": "/200.html" 
				 },
				{
				 "title": "the West stars glinted bright. Come!  said Aragorn. We will  venture one more journey  by night. We are coming to reaches of the River that I do not know well: for I have never journeyed by water i",
				"url": "/198.html" 
				 },
				{
				 "title": "Chapter 9. The Great River Frodo  was roused  by Sam. He found  that  he was  lying, well wrapped, under tall grey-skinned trees in a quiet corner of the woodlands on the west bank of the  Great River",
				"url": "/195.html" 
				 }
				]},
				{ "id": 11,
				 "x": 0, 
				 "y": 0, 
				 "text": "shone mist gray lurien elves ", 
				 "date": "2000-07-12",
				"lines":[0, 2], 
				 "imp": "2",
				 "articles": [{
				 "title": "you desire something that I could give? Name it, I bid you! You shall not be the only guest without a gift. There  is  nothing,  Lady  Galadriel,  said  Gimli,  bowing  low  and stammering. Nothin",
				"url": "/193.html" 
				 },
				{
				 "title": "from  the  East. On  the  other  side the meads had  become rolling downs of withered grass amidst a land of fen and tussock. Frodo shivered, thinking of the lawns and fountains, the clear sun and gen",
				"url": "/196.html" 
				 },
				{
				 "title": "Nambril! Nai hiruvalyl Valimar. Nai elyl hiruva. Nambril! Ah! like gold fall the leaves in the  wind,  long years numberless  as the  wings of trees!  The long years have passed like  swift draughts ",
				"url": "/194.html" 
				 },
				{
				 "title": "trodden  with  this Company, I  do  not much doubt  that I shall find a  way through Rohan, and Fangorn too, if need be. Then  I need say no more, said Celeborn. But do not despise the lore that h",
				"url": "/192.html" 
				 },
				{
				 "title": "His  own  plan, while Gandalf remained with  them, had been to go  with Boromir, and with his sword help to deliver Gondor. For he believed that the message of the dreams was a summons, and that the h",
				"url": "/189.html" 
				 }
				]},
				{ "id": 12,
				 "x": 0, 
				 "y": 0, 
				 "text": "orcs north sword fall choice ", 
				 "date": "2000-07-31",
				"lines": [0,2], 
				 "imp": "2",
				 "articles": [{
				 "title": "Boromir  is dead, said Aragorn. I am unscathed,  for  I was not here with him. He fell defending the hobbits, while I was away upon the hill. The hobbits! cried Gimli Where are they then? Where",
				"url": "/212.html" 
				 },
				{
				 "title": "At the water-side Aragorn  remained, watching the  bier. while  Legolas and Gimli hastened back on foot to Parth  Galen. It was  a mile or more, and it was some time before they came back, paddling tw",
				"url": "/213.html" 
				 },
				{
				 "title": "* BOOK III * Chapter 1. The Departure of Boromir Aragorn sped on up the hill. Every now and again he bent to the ground. Hobbits go light, and  their  footprints are not  easy  even for a Ranger to re",
				"url": "/211.html" 
				 },
				{
				 "title": "Jomer had shrunk; and in his  living face they caught a brief vision of  the power and majesty of the  kings of stone. For a moment it seemed to the eyes of Legolas  that a white flame  flickered  on ",
				"url": "/222.html" 
				 },
				{
				 "title": "up and dismounted at his side, he drew his sword and stood face to face with Aragorn, surveying him keenly, and not  without wonder. At  length  he spoke again. At first I thought that you yourselves",
				"url": "/221.html" 
				 }
				]},
				{ "id": 13,
				 "x": 0, 
				 "y": 0, 
				 "text": "orcs follow run resting rohan ", 
				 "date": "2000-08-04",
				"lines": [0, 2,3], 
				 "imp": "3",
				 "articles": [{
				 "title": "jet, tipped with glimmering snows, flushed with the rose of morning. Gondor! Gondor! cried  Aragorn. Would that I looked on  you again in happier hour! Not yet does my road lie southward to your br",
				"url": "/216.html" 
				 },
				{
				 "title": "I fear they have passed beyond my sight from hill or plain, under moon or sun, said Legolas. Where sight fails the earth may  bring us rumour, said  Aragorn. The land  must  groan under  their ha",
				"url": "/218.html" 
				 },
				{
				 "title": "Chapter 2. The Riders of Rohan Dusk deepened. Mist lay behind them among the trees below, and  brooded on  the pale margins of the Anduin, but the  sky was clear. Stars  came out. The waxing  moon  wa",
				"url": "/215.html" 
				 },
				{
				 "title": "his road. and we must make haste to choose our own. He surveyed the green  lawn, quickly but  thoroughly, stooping often to the earth. The Orcs have been on this ground, he  said. Otherwise nothin",
				"url": "/214.html" 
				 },
				{
				 "title": "Let us hope that  he  did not pay  too dearly for his  boldness, said Legolas. Come! Let us  go on! The thought of those merry young folk  driven like cattle burns my heart. The  sun climbed to  t",
				"url": "/217.html" 
				 }
				]},
				{ "id": 14,
				 "x": 0, 
				 "y": 0, 
				 "text": "orcs mark horse forest rider ", 
				 "date": "2000-08-14",
				"lines": [0, 2,3], 
				 "imp": "2",
				 "articles": [{
				 "title": "Then  Shadowfax  has found  his  way alone from  the far North,  said Aragorn; for  it  was there that he and Gandalf  parted. But  alas! Gandalf will  ride no longer. He fell into darkness in the ",
				"url": "/223.html" 
				 },
				{
				 "title": "hither, said Legolas. And it might draw other things, neither Orc nor Hobbit, said Aragorn. We are  near to the mountain-marches of the traitor Saruman. Also we are on the  very edge of Fangorn,  ",
				"url": "/226.html" 
				 },
				{
				 "title": "I fear they have passed beyond my sight from hill or plain, under moon or sun, said Legolas. Where sight fails the earth may  bring us rumour, said  Aragorn. The land  must  groan under  their ha",
				"url": "/218.html" 
				 },
				{
				 "title": "north along the  dry  skirts  of the hills. Aragorn halted and examined  the tracks closely. They rested here a  while, he said,  but even the outward  trail  is already  old. I  fear  that your  h",
				"url": "/219.html" 
				 },
				{
				 "title": "Nay!  The  riders are little  more  than  five leagues distant,  said Legolas. Five leagues or  one, said Gimli; we cannot escape them in this bare land. Shall we wait for them here or go on our ",
				"url": "/220.html" 
				 }
				]},
				{ "id": 15,
				 "x": 0, 
				 "y": 0, 
				 "text": "orcs saruman horse isengard merry ", 
				 "date": "2000-08-21",
				"lines": [0,1], 
				 "imp": "2",
				 "articles": [{
				 "title": "great Uglk will lead us out again. Put  those  Halflings  down!  ordered  Uglk,  taking  no  notice  of Grishnbkh. You, Lugdush, get two others  and stand guard over them! Theyre not to be kill",
				"url": "/233.html" 
				 },
				{
				 "title": "All that  they make  out! One day  youll  wish that you  had not said that. Ape! he snarled fiercely.  You ought to know that theyre the apple of the Great Eye. But the winged  Nazgyl: not  yet, n",
				"url": "/232.html" 
				 },
				{
				 "title": "softly. Thats what he means, is it? O  ho! Very ve-ry dangerous, my little ones. Perhaps, said Merry, now alert and aware of Pippins guess. Perhaps; and not only  for us. Still you know your ow",
				"url": "/234.html" 
				 },
				{
				 "title": "He cut the thongs round Pippins legs and ankles, picked him  up by his hair  and stood him  on his feet. Pippin fell down, and Uglk dragged him up by  his hair again. Several Orcs  laughed. Uglk th",
				"url": "/230.html" 
				 },
				{
				 "title": "away. We are the fighting  Uruk-hai! We slew the  great warrior. We took the prisoners. We are the servants of Saruman the Wise, the White Hand: the Hand that gives us mans-flesh to eat. We came out ",
				"url": "/229.html" 
				 }
				]},
				{ "id": 16,
				 "x": 0, 
				 "y": 0, 
				 "text": "battle fangorn forest light guessed ", 
				 "date": "2000-09-08",
				"lines": [1], 
				 "imp": "2",
				 "articles": [{
				 "title": "Chapter 5. The White Rider My very bones are chilled, said Gimli, flapping his arms and stamping his  feet.  Day  had  come at last.  At dawn  the companions  had made  such breakfast as they could;",
				"url": "/251.html" 
				 },
				{
				 "title": "Now, said Merry,  if only we had our legs  and hands free,  we might get away. But I cant touch the knots, and I cant bite them. No need to  try,  said Pippin. I was going to tell you: Ive m",
				"url": "/235.html" 
				 },
				{
				 "title": "time to  waste; for he  that  strikes the  first blow, if he strikes it hard enough, may need  to strike no  more.  So the forces that he has  long  been preparing he is now  setting in motion, sooner",
				"url": "/256.html" 
				 },
				{
				 "title": "was spilled  there,  a few paces away, orc-blood. There  are  deep prints of hoofs  all about this  spot, and signs that a heavy thing was  dragged away. The Orc  was slain by horsemen, and later  his",
				"url": "/252.html" 
				 },
				{
				 "title": "we are. Maybe you have heard  of Trolls? They  are mighty strong. But Trolls are only counterfeits. made by the  Enemy in the Great  Darkness, in mockery of Ents, as Orcs were of Elves. We are stronge",
				"url": "/250.html" 
				 }
				]},
				{ "id": 17,
				 "x": 0, 
				 "y": 0, 
				 "text": "test node test node", 
				 "date": "2000-01-02",
				"lines": [5], 
				 "imp": "2",
				 "articles": [{
				 "title": "foo",
				"url": "foo.html" 
				 },
				{
				 "title": "bar",
				"url": "bar.html" 
				 }
				]},
				{ "id": 18,
				 "x": 0, 
				 "y": 0, 
				 "text": "test node2 test node2", 
				 "date": "2000-04-02",
				"lines": [5,6], 
				 "imp": "1",
				 "articles": [{
				 "title": "foo",
				"url": "foo.html" 
				 },
				{
				 "title": "bar",
				"url": "bar.html" 
				 }
				]},
				{ "id": 19,
				 "x": 0, 
				 "y": 0, 
				 "text": "test node test node", 
				 "date": "2000-07-02",
				"lines": [5], 
				 "imp": "2",
				 "articles": [{
				 "title": "foo",
				"url": "foo.html" 
				 },
				{
				 "title": "bar",
				"url": "bar.html" 
				 }
				]},
				{ "id": 20,
				 "x": 0, 
				 "y": 0, 
				 "text": "test node2 test node2", 
				 "date": "2000-10-02",
				"lines": [6], 
				 "imp": "1",
				 "articles": [{
				 "title": "foo",
				"url": "foo.html" 
				 },
				{
				 "title": "bar",
				"url": "bar.html" 
				 }
				]}
				]
	}
	sanitizeData(data);
	
	$("#mapTitle").html(data.name + " Metromap");
	
	initializeStageAndLayers();
	document.addEventListener("mousewheel", zoom, false);
	draw();
}

// Create references from nodes to lines and lines to nodes
// Also, set x and y positions
function sanitizeData(data) {
	allLines = data.lines;
	allNodes = data.events;
	
	for (var l in allLines) {
		for (var n in allNodes) {
			if ($.inArray(parseInt(l), allNodes[n].lines) != -1) {
				(allLines[l].nodes).push(parseInt(n));
			}
		}
	}
	
	/* Calculate optimal layout and initialize to layer 0 */
	setLayout(nodes);
	setNodesAndLines(0);
}

function initializeStageAndLayers() {
	stage = new Kinetic.Stage({
		container: 'container',
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
		draggable:true
	});
	tickStage = new Kinetic.Stage({
		container: 'container',
		width: CANVAS_WIDTH,
		height: 60,
		draggable: true
	});
	stage.on('dragmove', function () {
		tickStage.setX(stage.getX());
		tickStage.draw();
	});
	
	var backgroundLayer = new Kinetic.Layer({
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	});
	var backgroundRect = new Kinetic.Rect({
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	});
	backgroundLayer.add(backgroundRect);
	clearArticleHandler(backgroundRect);
	stage.add(backgroundLayer);
	
	drawTimeline(tickStage);
	stage.add(currentLayer);
}

/***********************************
GENERAL HELPER FUNCTIONS
***********************************/

function initializeColors(){
	colors = {};
	for (var l in allLines) {
		colors[l] = get_random_color();
	}
}

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function getNodeById(nodeId) {
	for (var n in nodes) {
		if (nodes[n].id == nodeId) {
			return nodes[n];
		}
	}
}

function getLineById(lineId) {
	for (var l in lines) {
		if (lines[l].id == lineId) {
			return lines[l];
		}
	}
}

/* Set the "nodes" and "lines" variables to a hold only the data of given layer */
function setNodesAndLines(layerId) {
	for (var l in allLines) {
		if (allLines[l].layerId == layerId) {
			lines.push(allLines[l]);
		}
	}
	
	var lineIds = lines.map(function(lineObj){ return lineObj.id;});
	
	for (var n in allNodes) {
		var myLines = allNodes[n].lines;
		for (var ml in myLines) {
			if (($.inArray(parseInt(myLines[ml]), lineIds) != -1) &&
			(!($.inArray(allNodes[n], nodes) != -1)))
			{
				nodes.push(allNodes[n]);
			}
		}
	}
	
}