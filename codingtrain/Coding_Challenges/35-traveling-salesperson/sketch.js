let cities = [];
const totalCities = 3;

function setup(){
	createCanvas(400, 300);

	for(let i = 0; i < totalCities; i++){
		let v = createVector(random(width), random(height));
		cities[i] = v;
	}
}

function draw(){
	background(0);

	fill(255);
	for(let i = 0; i < cities.length; i++){
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

	stroke(255);
	strokeWeight(2);
	noFill();
	beginShape();
	for(let i = 0; i < cities.length; i++){
		vertex(cities[i].x, cities[i].y);
	}
	endShape();
}

function swap(a, i, j){

}