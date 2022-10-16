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
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "none";
    });
    const btnCanvas = document.getElementById("btnCanvas");
    btnCanvas.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        btnCanvasSVG.classList.replace("btnActive", "btnInactive");
        document.getElementById("fldSVG").style.display = "none";
        document.getElementById("fldCanvas").style.display = "block";
    });
    const btnCanvasSVG = document.getElementById("btnCanvasSVG");
    btnCanvasSVG.addEventListener('click', function () {
        this.classList.replace("btnInactive", "btnActive");
        btnCanvas.classList.replace("btnActive", "btnInactive");
        btnSVG.classList.replace("btnActive", "btnInactive");
        document.getElementById("fldSVG").style.display = "block";
        document.getElementById("fldCanvas").style.display = "block";
    });
}