function Spot(x, y){
	this.x = x;
	this.y = y;

	this.f = 0;
	this.g = 0;
	this.h = 0;

	this.prev = undefined;
	this.neighbors = [];

	this.wall = false;

	if(random(1) < .4) this.wall = true;

	this.show = function(col) {
		if(this.wall) {
			fill(220);
			noStroke();
			ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2);
		}
		else if(col){
			fill(col);
			noStroke();
			rect(this.x * w, this.y * h, w, h);
		}
	}

	this.addNeighbors = function() {
		var x = this.x;
		var y = this.y;

		if(x < cols - 1) this.neighbors.push(grid[x + 1][y]);
		if(x > 0) this.neighbors.push(grid[x - 1][y]);
		if(y < rows - 1) this.neighbors.push(grid[x][y + 1]);
		if(y > 0) this.neighbors.push(grid[x][y - 1]);

		// Diagonals
		if(x > 0 && y > 0) this.neighbors.push(grid[x - 1][y - 1]);
		if(x < cols - 1 && y > 0) this.neighbors.push(grid[x + 1][y - 1]);
		if(x < cols - 1 && y < rows - 1) this.neighbors.push(grid[x + 1][y + 1]);
		if(x > 0 && y < rows - 1) this.neighbors.push(grid[x - 1][y + 1]);
	}
}