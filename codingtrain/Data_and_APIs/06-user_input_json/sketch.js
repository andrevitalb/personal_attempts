var spaceData;
var url = "api.openweathermap.org/data/2.5/weather?APPID=7aaf2a637ef23eeacc74321181fcccf0&units=metric&q=London";

function setup() {
	createCanvas(600,600);
	loadJSON(url gotData);
}

function gotData(data){
	spaceData = data;
}

function draw() {
	background(0);
	if(spaceData){

	}
}