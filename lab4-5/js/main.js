//Canvas & SVG
let isSvg = true;
let isCanvas = false;
let isCanvasSVG = false;

//Figures
let isRectangle = true;
let isCircle = false;

window.onload = () => {
    //Canvas & SVG
    const svg = document.getElementById('svg');
    const canvas = document.getElementById('canvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    //Canvas & SVG switching buttons
    const btnSVG = document.getElementById("btnSVG");
    btnSVG.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCanvas.classList.replace("btnActive", "btnInactive");
        btnCanvasSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnBlocked", "btnUnblocked");
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "none";
        isSvg = true;
        isCanvas = false;
        isCanvasSVG = false;
    });
    const btnCanvas = document.getElementById("btnCanvas");
    btnCanvas.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        btnCanvasSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnBlocked", "btnUnblocked");
        document.getElementById("fldSVG").style.display = "none";
        document.getElementById("fldCanvas").style.display = "block";
        isSvg = false;
        isCanvas = true;
        isCanvasSVG = false;
    });
    const btnCanvasSVG = document.getElementById("btnCanvasSVG");
    btnCanvasSVG.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCanvas.classList.replace("btnActive", "btnInactive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        btnClear.classList.replace("btnUnblocked", "btnBlocked");
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "block";
        isSvg = false;
        isCanvas = false;
        isCanvasSVG = true;
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
    });

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
                rect.setAttributeNS(null, "stroke", "black");
                rect.setAttributeNS(null, "fill", "orange");
                svg.appendChild(rect);
            }
            if (isCircle && isSvg) {
                circle.setAttributeNS(null, "cx", start.x);
                circle.setAttributeNS(null, "cy", start.y);
                circle.setAttributeNS(null, 'r', radius);
                circle.setAttributeNS(null, "stroke", "black");
                circle.setAttributeNS(null, "fill", "pink");
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
}