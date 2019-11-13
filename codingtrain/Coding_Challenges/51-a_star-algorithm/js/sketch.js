function removeFromArray(arr, val){
	for(let i = arr.length - 1; i >= 0; i--){
		if(arr[i] == val) arr.splice(i, 1);
	}
}

function heuristic(first, last){
	// ***** Euclidian Distance from current to end
	let a = last.x - first.x;
	let b = last.y - first.y;

	let insideSqrt = Math.pow(a, 2) + Math.pow(b, 2);
	return Math.sqrt(insideSqrt);

	// ***** Manhattan Distance from current to end
	// var d = abs(first.x - last.x) + abs(first.y - last.y);
	return d;
}

var cols;
var rows;
var grid;

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;
var path = [];

var found = false;

function setup(){
	// noCanvas();
}

function setGrid(col, row){
	var ratio;
	var canvasWidth;
	var canvasHeight;
	found = false;

	cols = col;
	rows = row;

	grid = new Array(cols);

	ratio = cols / rows;

	if(ratio > 1.7){
		canvasWidth = 1000;
		canvasHeight = canvasWidth / ratio;
	}
	else {
		canvasHeight = 500;
		canvasWidth = canvasHeight * ratio;
	}

	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('canvas_holder');

	w = width / cols;
	h = height / rows;

	for(let i = 0; i < cols; i++) grid[i] = new Array(rows);	

	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j] = new Spot(i, j);
		}
	}

	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j].addNeighbors();
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;

	openSet.push(start);

	loop();
}

function restartGrid(){
	for(let i = 0; i < cols; i++) for(let j = 0; j < rows; j++) grid[i][j].show(color(33));
	cols = 0;
	rows = 0;
	grid = 0;

	openSet = [];
	closedSet = [];

	start = 0;
	end = 0;

	w = 0;
	h = 0;
	path = [];

	found = false;

	clear();
}

function draw(){
	if(startDraw){
		if(openSet.length > 0){
			var firstPlace = 0;

			for(let i = 0; i < openSet.length; i++) if(openSet[i].f < openSet[firstPlace].f) firstPlace = i;

			var current = openSet[firstPlace];

			if(current === end) {
				noLoop();
				found = true;
			}

			removeFromArray(openSet, current);
			closedSet.push(current);

			var neighbors = current.neighbors;

			for(let i = 0 ; i < neighbors.length; i++){
				var neighbor = neighbors[i];

				if(!closedSet.includes(neighbor) && !neighbor.wall){
					var tempG = current.g + 1;
					var newPath = false;

					if(openSet.includes(neighbor)){
						if(neighbor.g > tempG) {
							neighbor.g = tempG;
							newPath = true;
						}
					} else {
						neighbor.g = tempG;
						newPath = true;
						openSet.push(neighbor);
					}

					if(newPath) {
						neighbor.h = heuristic(neighbor, end);
						neighbor.f = neighbor.g + neighbor.h;

						neighbor.prev = current;
					}
				}
				neighbor.g = current.g + 1;
			}

		} else {
			alert("No hay solución");
			noLoop();
			return;
		}

		background(33);

		for(let i = 0; i < cols; i++) for(let j = 0; j < rows; j++) grid[i][j].show(color(33));

		for(let i = 0; i < closedSet.length; i++) closedSet[i].show(color(144, 23, 23, 50));
		for(let i = 0; i < openSet.length; i++) openSet[i].show(color(142, 183, 200, 75));

		path = [];
		var temp = current;
		path.push(temp);

		while(temp.prev){
			path.push(temp.prev);
			temp = temp.prev;
		}

		noFill();
		stroke(23, 108, 144);
		strokeWeight(w / 2);

		beginShape();
		for(let i = 0; i < path.length; i++) vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
		endShape();

		if(found) alert("Punto encontrado");
	}
}