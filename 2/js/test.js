// Code goes here
var SVG_URI = 'http://www.w3.org/2000/svg';
function Path(start, container) {
  this.coords = [start];
  this.element = document.createElementNS(SVG_URI, 'path');
  this.element.setAttribute('stroke', '#ff0000');
  this.element.setAttribute('fill', 'none');
  container.appendChild(this.element);

}
Path.prototype.getPathAttr = function() {
  return `M${this.coords[0].x} ${this.coords[0].y} ${this.coords.slice(1).map(coords => `L ${coords.x} ${coords.y}`).join(' ')}`;
}
Path.prototype.add = function(coords) {
  this.coords.push(coords);
  this.element.setAttribute('d', this.getPathAttr());
}

function getPoint(evt) {
  return {
    x: evt.offsetX,
    y: evt.offsetY,
  }
}

var canvas = document.getElementById('canvas');

var isDrawing = false;

var currentPath = null;
canvas.addEventListener('click', (evt) => {
  if (isDrawing) {
    currentPath = null;
    isDrawing = false;
  } else {
    currentPath = new Path(getPoint(evt), canvas);
    isDrawing = true;
  }
})
canvas.addEventListener('mousemove', (evt) => {
  if (isDrawing) {
    currentPath.add(getPoint(evt));
  }
})
