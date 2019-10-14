// André Vital
// https://andrevital.com

// Breadth-First search

// Based on Daniel Shiffman's Coding Challenge Video
// http://codingtra.in

function Node(value) {
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}

Node.prototype.addEdge = function(neighbor) {
  this.edges.push(neighbor);
  // Both directions!
  neighbor.edges.push(this);
}