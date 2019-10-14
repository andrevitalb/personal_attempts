// André Vital
// https://andrevital.com

// Breadth-First search

// Based on Daniel Shiffman's Coding Challenge Video
// http://codingtra.in

function Graph(){
	this.nodes = [];
	this.graph = {};
	this.start = null;
	this.end = null;
}

Graph.prototype.reset = function(){
	for(let i = 0; i < this.nodes.length; i++){
		this.nodes[i].searched = false;
		this.nodes[i].parent = null;
	}
}

Graph.prototype.setStart = function(node){
	this.start = this.graph[node];
	return this.start;
}

Graph.prototype.setEnd = function(node){
	this.end = this.graph[node];
	return this.end;
}

Graph.prototype.addNode = function(n) {
	this.nodes.push(n);
	var title = n.value;
	this.graph[title] = n;
}

Graph.prototype.getNode = function(actor) {
	var n = this.graph[actor];
	return n;
}