var isRect = true;
var isCircle = false;

window.onload = () => {
    // Code goes here
    var isDrawing = false;

    let endX;
    let endY;
    let startX;
    let startY;

    var canvas = document.getElementById('canvas');

    canvas.addEventListener('click', (evt) => {
        if (isDrawing) {
            endX = evt.offsetX;
            endY = evt.offsetY;
            isDrawing = false;
            console.log("tap2 " + endX + " " + endY);
            if (isRect) {
                drawRectangle(startX, startY, endX, endY);
            } else {
                drawCircle(startX, startY, endX, endY);
            }
        } else {
            startX = evt.offsetX;
            startY = evt.offsetY;
            drawPoint(startX, startY);
            isDrawing = true;
            console.log("tap1 " + startX + " " + startY);
        }
    })

    function drawRectangle(startX, startY, endX, endY) {
        if (endX - startX < 0) {
            var temp = startX;
            startX = endX;
            endX = temp;
            console.log("swapped w");
        }

        if (startY - endY > 0) {
            var temp = startY;
            startY = endY;
            endY = temp;
            console.log("swapped h");
        }

        var width = endX - startX;
        var height = endY - startY;

        var doc = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        doc.setAttributeNS(null, "x", startX);
        doc.setAttributeNS(null, "y", startY);
        doc.setAttributeNS(null, "width", width);
        doc.setAttributeNS(null, "height", height);
        console.log("x=" + startX + "; y=" + startY + "; width=" + width + "; height=" + height);
        doc.setAttributeNS(null, "stroke", "black");
        doc.setAttributeNS(null, "fill", "pink");
        document.getElementById('canvas').appendChild(doc);
    }

    function drawCircle(startX, startY, endX, endY) {
        if (endX - startX < 0) {
            var temp = startX;
            startX = endX;
            endX = temp;
            console.log("swapped w");
        }

        if (startY - endY > 0) {
            var temp = startY;
            startY = endY;
            endY = temp;
            console.log("swapped h");
        }

        var rX = endX - startX;
        var rY = endY - startY;
        var r = Math.sqrt(rX * rX + rY * rY);

        var doc = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        doc.setAttributeNS(null, "cx", startX);
        doc.setAttributeNS(null, "cy", startY);
        doc.setAttributeNS(null, "r", r);
        console.log("x=" + startX + "; y=" + startY + "; r=" + r);
        doc.setAttributeNS(null, "fill", "orange");
        document.getElementById('canvas').appendChild(doc);

    }

    function drawPoint(startX, startY) {
        var doc = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        doc.setAttributeNS(null, "cx", startX);
        doc.setAttributeNS(null, "cy", startY);
        var r = Math.abs(endX - startX);
        doc.setAttributeNS(null, "r", 0.5);
        console.log("x=" + startX + "; y=" + startY + "; r=" + r);
        doc.setAttributeNS(null, "fill", "pink");
        document.getElementById('canvas').appendChild(doc);
    }

}

function rect() {
    isRect = true;
    isCircle = false;
}

function circ() {
    isRect = false;
    isCircle = true;
}

function clr() {
    var doc = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    doc.setAttributeNS(null, "x", 0);
    doc.setAttributeNS(null, "y", 0);
    doc.setAttributeNS(null, "width", 1200);
    doc.setAttributeNS(null, "height", 800);
    doc.setAttributeNS(null, "stroke", "black");
    doc.setAttributeNS(null, "fill", "white");
    document.getElementById('canvas').appendChild(doc);
    console.log("clear");
}
