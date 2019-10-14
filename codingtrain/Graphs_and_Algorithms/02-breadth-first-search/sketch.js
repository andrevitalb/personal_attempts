// André Vital
// https://andrevital.com

// Breadth-First search

// Based on Daniel Shiffman's Coding Challenge Video
// http://codingtra.in

var data;
var dropdown;
var graph;

function preload() {
	data = loadJSON('https://raw.githubusercontent.com/jmmedel/Javascirpt-Code-Chanllenges/master/CodingChallenges/CC_068_BFS_kevin_bacon/kevinbacon.json');
}

function setup(){
	graph = new Graph();
	dropdown = createSelect();
	dropdown.changed(bfs);
	noCanvas();
	var movies = data.movies;

	for(let i = 0; i < movies.length; i++){
		var movie = movies[i].title;
		var movieNode = new Node(movie);
		graph.addNode(movieNode);

		var actors = movies[i].cast;

		for(let j = 0; j < actors.length; j++){
			var actor = actors[j];
			var actorNode = graph.getNode(actor);

			if(actorNode == undefined) {
				actorNode = new Node(actor);
        		dropdown.option(actor);
        	}

			graph.addNode(actorNode);
			actorNode.addEdge(movieNode);
		}
	}
}

function bfs(){
	graph.reset();
	var start = graph.setStart(dropdown.value());
	var end = graph.setEnd("Kevin Bacon");

	var queue = [];
  	var txt = '';

	start.searched = true;
	queue.push(start);

	while(queue.length > 0){
		var currNode = queue.shift();
		if(currNode == end)  break;

		for(let i = 0; i < currNode.edges.length; i++){
			let next = currNode.edges[i];
			if(!next.searched){
				next.searched = true;
				queue.push(next);
				next.parent = currNode;
			}
		}
	}

	var path = [];

	path.push(end);
	let next = end.parent;

	while(next != null){
		path.push(next);
		next = next.parent;
	}

	txt += start.value + " has a Kevin Bacon number of " + (path.length - 2) + "<br><br>";

	for(let i = path.length - 1; i >= 0; i--){
		var n = path[i].value;

		txt += n;
		if(i > 0) txt += "<br>|<br>|<br>v<br>";
	}
	createP(txt);
}