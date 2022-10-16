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
    });
    const btnCircle = document.getElementById("btnCircle");
    btnCircle.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnRectangle.classList.replace("btnActive", "btnInactive");
    });
    const btnClear = document.getElementById("btnClear");
    btnClear.addEventListener('click', function () {

    });

}