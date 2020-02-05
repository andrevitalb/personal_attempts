function Cell(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function(){
		let neighbors = [];

		let top = grid[index(i, j - 1)];
		let right = grid[index(i + 1, j)];
		let bottom = grid[index(i, j + 1)];
		let left = grid[index(i - 1, j)];

		if(top && !top.visited) neighbors.push(top);
		if(right && !right.visited) neighbors.push(right);
		if(bottom && !bottom.visited) neighbors.push(bottom);
		if(left && !left.visited) neighbors.push(left);

		if(neighbors.length > 0) {
			let r = floor(random(0, neighbors.length));
			return neighbors[r];
		}

		return undefined;
	}

	this.highlight = function() {
		let x = this.i * w;
		let y = this.j * w;
		
		noStroke();
		fill(81, 166, 216, 100);
		rect(x, y, w, w);
	}

	this.show = function(){
		let x = this.i * w;
		let y = this.j * w;
		
		stroke(255);

		if(this.walls[0]) line(x    , y    , x + w, y    );	// Top
		if(this.walls[1]) line(x + w, y    , x + w, y + w);	// Right
		if(this.walls[2]) line(x    , y + w, x + w, y + w);	// Bottom
		if(this.walls[3]) line(x    , y    , x    , y + w);	// Left

		if(this.visited){
			noStroke();
			fill(63, 137, 180, 100);
			rect(x, y, w, w);
		}
	}
}