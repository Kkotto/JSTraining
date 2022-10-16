//Canvas & SVG
let isSvg = true;
let isCanvas = false;

//Figures
let isRectangle = true;
let isCircle = false;

//Drawing settings
let colors = {
    red: "#6a0114",
    yellow: "#ffdc32",
    green: "#ADFF2F",
    blue: "#1aa9ff",
    purple: "#60449f",
    black: "#000000",
    pink: "#ffb5c3"
};
let sizes = {"3": 3, "5": 5, '7': 7, '9': 9, '11': 11, '13': 13};

window.onload = () => {
    //Canvas & SVG
    const svg = document.getElementById('svg');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);


    //Canvas & SVG switching buttons
    const btnSVG = document.getElementById("btnSVG");
    btnSVG.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCanvas.classList.replace("btnActive", "btnInactive");
        btnCanvasSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnBlocked", "btnUnblocked");
        svg.classList.replace("cnvInactive", "cnvActive");
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "none";
        isSvg = true;
        isCanvas = false;
    });
    const btnCanvas = document.getElementById("btnCanvas");
    btnCanvas.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        btnCanvasSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnBlocked", "btnUnblocked");
        canvas.classList.replace("cnvInactive", "cnvActive");
        document.getElementById("fldSVG").style.display = "none";
        document.getElementById("fldCanvas").style.display = "block";
        isSvg = false;
        isCanvas = true;
    });
    const btnCanvasSVG = document.getElementById("btnCanvasSVG");
    btnCanvasSVG.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCanvas.classList.replace("btnActive", "btnInactive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnUnblocked", "btnBlocked");
        svg.classList.replace("cnvActive", "cnvInactive");
        canvas.classList.replace("cnvActive", "cnvInactive");
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "block";
        isSvg = false;
        isCanvas = false;
    });


    //Figures switching buttons
    const btnRectangle = document.getElementById("btnRectangle");
    btnRectangle.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCircle.classList.replace("btnActive", "btnInactive");
        isRectangle = true;
        isCircle = false;
    });
    const btnCircle = document.getElementById("btnCircle");
    btnCircle.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnRectangle.classList.replace("btnActive", "btnInactive");
        isRectangle = false;
        isCircle = true;
    });
    const btnClear = document.getElementById("btnClear");
    btnClear.addEventListener('click', function () {
        if (isSvg) {
            while (svg.lastChild) {
                svg.removeChild(svg.lastChild);
            }
        }
        if (isCanvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            figures = [];
        }
    });


    //Drawing settings
    const colorSelector = document.getElementById("colorFill");
    colorSelector.addEventListener('click', event => {
        color = colors[colorSelector.value];
    });
    let color = colors[colorSelector.value];
    const lineColorSelector = document.getElementById("colorLine");
    lineColorSelector.addEventListener('click', event => {
        lineColor = colors[lineColorSelector.value];
    });
    let lineColor = colors[lineColorSelector.value];
    const lineSizeSelector = document.getElementById("lineWidth");
    lineSizeSelector.addEventListener('click', event => {
        lineSize = sizes[lineSizeSelector.value];
    });
    let lineSize = sizes[lineSizeSelector.value];


    //SVG event listener
    svg.addEventListener('mousedown', (event) => {
        const svgPoint = (elem, x, y) => {
            const p = svg.createSVGPoint();
            p.x = x;
            p.y = y;
            return p.matrixTransform(elem.getScreenCTM().inverse());
        };
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const start = svgPoint(svg, event.clientX, event.clientY);

        const drawRect = (e) => {
            const point = svgPoint(svg, e.clientX, e.clientY);
            const width = Math.abs(point.x - start.x);
            const height = Math.abs(point.y - start.y);
            const radius = Math.sqrt(Math.pow(point.x - start.x, 2) + Math.pow(point.y - start.y, 2));
            if (point.x > start.x) {
                point.x = start.x;
            }
            if (point.y > start.y) {
                point.y = start.y;
            }
            if (isRectangle && isSvg) {
                rect.setAttributeNS(null, 'x', point.x);
                rect.setAttributeNS(null, 'y', point.y);
                rect.setAttributeNS(null, 'width', width);
                rect.setAttributeNS(null, 'height', height);
                rect.setAttributeNS(null, "stroke", lineColor);
                rect.setAttributeNS(null, "fill", color);
                rect.setAttributeNS(null, "stroke-width", lineSize);
                svg.appendChild(rect);
            }
            if (isCircle && isSvg) {
                circle.setAttributeNS(null, "cx", start.x);
                circle.setAttributeNS(null, "cy", start.y);
                circle.setAttributeNS(null, 'r', radius);
                circle.setAttributeNS(null, "stroke", lineColor);
                circle.setAttributeNS(null, "fill", color);
                circle.setAttributeNS(null, "stroke-width", lineSize);
                svg.appendChild(circle);
            }
        };

        const endDraw = (event) => {
            svg.removeEventListener('mousemove', drawRect);
            svg.removeEventListener('mouseup', endDraw);
        };

        svg.addEventListener('mousemove', drawRect);
        svg.addEventListener('mouseup', endDraw);
    });


    //Canvas event listener
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = lineSize;
    context.strokeStyle = lineColor;
    context.fillStyle = color;
    let isDrawStart = false;
    let startPosition = {x: 0, y: 0};
    let endPosition = {x: 0, y: 0};
    let figureWidth = 0;
    let figureHeight = 0;
    let figureRadius = 0;
    let figures = [];

    function getClientOffset(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        return {x, y}
    }

    canvas.addEventListener('mousedown', event => {
        startPosition = getClientOffset(event);
        isDrawStart = true;
    });
    canvas.addEventListener('mousemove', event => {
        if (!isDrawStart || !isCanvas) return;

        endPosition = getClientOffset(event);
        figureWidth = endPosition.x - startPosition.x;
        figureHeight = endPosition.y - startPosition.y;
        figureRadius = Math.abs(endPosition.x - startPosition.x);
        clearCanvas();
        if (isRectangle) drawRectangle(startPosition.x, startPosition.y, figureWidth, figureHeight, color, lineColor, lineSize);
        else drawCircle(startPosition.x, startPosition.y, figureRadius, color, lineColor, lineSize);
    });
    canvas.addEventListener('mouseup', event => {
        if (isRectangle) {
            figures.push({
                isRect: true, x: startPosition.x, y: startPosition.y,
                width: figureWidth, height: figureHeight, radius: 0,
                color: color, lineColor: lineColor, lineSize: lineSize
            });
        }
        if (isCircle) {
            figures.push({
                isRect: false, x: startPosition.x, y: startPosition.y,
                width: 0, height: 0, radius: figureRadius,
                color: color, lineColor: lineColor, lineSize: lineSize
            });
        }
        isDrawStart = false;
    });

    function drawRectangle(x, y, width, height, color, lineColor, lineSize) {
        context.beginPath();
        context.lineWidth = lineSize;
        context.fillStyle = color;
        context.strokeStyle = lineColor;
        context.rect(x, y, width, height);
        context.fill();
        context.stroke();
    }

    function drawCircle(x, y, radius, color, lineColor, lineSize) {
        context.beginPath();
        context.lineWidth = lineSize;
        context.fillStyle = color;
        context.strokeStyle = lineColor;
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        figures.forEach((item, i) => {
            if (item.isRect) {
                drawRectangle(item.x, item.y, item.width, item.height, item.color, item.lineColor, item.lineSize);
            } else {
                drawCircle(item.x, item.y, item.radius, item.color, item.lineColor, item.lineSize);
            }
        });
    }
}