//------------------------ПЕРЕМЕННЫЕ------------------------------
let activeField = "SVG"; //выбор слоя
let activeFigure = "rectangle"; //выбор фигуры
let isDrawingMode = true; //можно ли рисовать (отключается для SVG при выделении объектов)
let figures = []; //фигуры для Canvas

window.onload = () => {
    //Все элементы с HTML по id

    const panel = document.querySelector("#panel");

    const btnSVG = document.querySelector("#btnSVG");
    const btnCanvas = document.querySelector("#btnCanvas");
    const btnAll = document.querySelector("#btnCanvasSVG");

    const btnRectangle = document.querySelector("#btnRectangle");
    const btnCircle = document.querySelector("#btnCircle");
    const btnCursor = document.querySelector("#btnCursor");
    const btnClear = document.querySelector("#btnClear");

    const btnRectDiv = document.querySelector("#btnRectDiv");
    const btnCircDiv = document.querySelector("#btnCircDiv");
    const btnCursDiv = document.querySelector("#btnCursDiv");
    const btnClearDiv = document.querySelector("#btnClearDiv");

    const inputFillingColor = document.querySelector("#inputFillingColor");
    const inputBorderColor = document.querySelector("#inputBorderColor");
    const slctBorderWidth = document.querySelector("#slctBorderWidth");

    const svgField = document.querySelector("#svgField");
    const canvasField = document.querySelector("#canvasField");
    const context = canvasField.getContext('2d');
    canvasField.setAttribute('width', window.innerWidth);
    canvasField.setAttribute('height', window.innerHeight);

    //----------------------ВЫБОР ПОЛЯ--------------------------------
    //SVG
    btnSVG.addEventListener('click', evt => {
        activeField = "SVG";
        isDrawingMode = true;
        blockButtonsSVG();
    });
    function blockButtonsSVG() {
        btnSVG.classList.replace("inactiveButton", "activeButton");
        btnCanvas.classList.replace("activeButton", "inactiveButton");
        btnAll.classList.replace("activeButton", "inactiveButton");

        svgField.style.display = "block";
        canvasField.style.display = "none";
        svgField.style.cursor = "crosshair";

        btnRectDiv.style.display = "block";
        btnCircDiv.style.display = "block";

        btnClearDiv.style.display = "block";
        btnCursDiv.style.display = "block";
    }


    //CANVAS
    btnCanvas.addEventListener('click', evt => {
        activeField = "Canvas";
        isDrawingMode = true;
        blockButtonsCanvas();
    });
    function blockButtonsCanvas() {
        btnCanvas.classList.replace("inactiveButton", "activeButton");
        btnSVG.classList.replace("activeButton", "inactiveButton");
        btnAll.classList.replace("activeButton", "inactiveButton");

        svgField.style.display = "none";
        canvasField.style.display = "block";
        canvasField.style.cursor = "crosshair";

        btnRectDiv.style.display = "block";
        btnCircDiv.style.display = "block";

        btnCursor.classList.replace("activeButton", "inactiveButton");
        btnClearDiv.style.display = "block";
        btnCursDiv.style.display = "none";

        //если кнопка курсора была выбрана в SVG, выделяем кнопку прямоугольника/круга активной, т.к. в Canvas кнопка курсора неактивна
        if (activeFigure === "rectangle") {
            btnRectangle.classList.replace("inactiveButton", "activeButton");
        }
        if (activeFigure === "circle") {
            btnCircle.classList.replace("inactiveButton", "activeButton");
        }
    }


    //CANVAS & SVG
    btnAll.addEventListener('click', evt => {
        activeField = "All";
        isDrawingMode = false;
        blockButtonsAllFields();
    });
    function blockButtonsAllFields() {
        btnAll.classList.replace("inactiveButton", "activeButton");
        btnSVG.classList.replace("activeButton", "inactiveButton");
        btnCanvas.classList.replace("activeButton", "inactiveButton");

        svgField.style.display = "block";
        canvasField.style.display = "block";
        svgField.style.cursor = "default";
        canvasField.style.cursor = "default";

        btnRectDiv.style.display = "none";
        btnCircDiv.style.display = "none";

        btnClearDiv.style.display = "none";
        btnCursDiv.style.display = "none";
    }


    //----------------------ВЫБОР ФИГУРЫ--------------------------------
    //RECTANGLE
    btnRectangle.addEventListener('click', ev => {
        activeFigure = "rectangle";
        isDrawingMode = true;

        btnRectangle.classList.replace("inactiveButton", "activeButton");
        btnCircle.classList.replace("activeButton", "inactiveButton");
        btnCursor.classList.replace("activeButton", "inactiveButton");
    });


    //CIRCLE
    btnCircle.addEventListener('click', evt => {
        activeFigure = "circle";
        isDrawingMode = true;

        btnRectangle.classList.replace("activeButton", "inactiveButton");
        btnCircle.classList.replace("inactiveButton", "activeButton");
        btnCursor.classList.replace("activeButton", "inactiveButton");
    });

    //----------------------ИНСТРУМЕНТЫ--------------------------------
    //CLEAR
    btnClear.addEventListener('click', evt => {
        if (activeField === "SVG") {
            while (svgField.lastChild) {
                svgField.removeChild(svgField.lastChild);
            }
        }
        if (activeField === "Canvas") {
            context.clearRect(0, 0, canvasField.width, canvasField.height);
            figures = [];
        }
    });


    //CURSOR
    btnCursor.addEventListener('click', evt => {
        isDrawingMode = false;
        svgField.style.cursor = "default";

        btnCursor.classList.replace("inactiveButton", "activeButton"); //выделить кнопку курсора как активную
        btnRectangle.classList.replace("activeButton", "inactiveButton"); //выделить кнопку прямоугольника как неактивную
        btnCircle.classList.replace("activeButton", "inactiveButton"); //выделить кнопку круга как неактивную

        countRect = document.querySelectorAll('rect')
        countCircle = document.querySelectorAll('circle')

        markFiguresAsDraggable(); //добавить фигурам класс, который позволит их перемещать
    });

    function markFiguresAsDraggable() {
        let rectangles = document.querySelectorAll('rect');
        let circles = document.querySelectorAll('circle');

        for (let i = 0; i < rectangles.length; i++) {
            rectangles[i].classList.add("dragRect");
        }
        for (let i = 0; i < circles.length; i++) {
            circles[i].classList.add("dragCircle");
        }
    }

    //-----------------------SVG РИСОВАНИЕ------------------------------
    let x, y; //координаты
    let isDrawingStarted = false; //начато ли рисование
    let figure; //рисуемые фигуры (создаются и добавляются в SVG)
    svgField.addEventListener('mousedown', (e) => {
        isDrawingStarted = true;
        x = e.clientX;
        y = e.clientY;
        if (isDrawingStarted && activeField === "SVG" && isDrawingMode) {
            if (activeFigure === "rectangle") {
                figure = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                figure.setAttribute("x", e.clientX - panel.clientWidth);
                figure.setAttribute("y", e.clientY);
                figure.setAttribute("fill", inputFillingColor.value);
                figure.setAttribute("stroke", inputBorderColor.value);
                figure.setAttribute("stroke-width", slctBorderWidth.value);
                svgField.appendChild(figure)
            }
            if (activeFigure === "circle") {
                figure = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
                figure.setAttribute("cx", e.clientX - panel.clientWidth)
                figure.setAttribute("cy", e.clientY);
                figure.setAttribute("fill", inputFillingColor.value);
                figure.setAttribute("stroke", inputBorderColor.value);
                figure.setAttribute("stroke-width", slctBorderWidth.value);
                svgField.appendChild(figure)
            }
        }
    });
    svgField.addEventListener('mousemove', (e) => {
        if (isDrawingStarted && activeField === "SVG" && isDrawingMode) {
            let radius = Math.sqrt(Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2));
            if (activeFigure === "rectangle") {
                if (e.clientX > x) {
                    figure.setAttribute("width", e.clientX - x)
                } else {
                    figure.setAttribute("x", e.clientX - panel.clientWidth)
                    figure.setAttribute("width", x - e.clientX)
                }
                if (e.clientY > y) {
                    figure.setAttribute("height", e.clientY - y)
                } else {
                    figure.setAttribute("y", e.clientY)
                    figure.setAttribute("height", y - e.clientY)
                }
            }
            if (activeFigure === "circle") {
                figure.setAttribute("r", radius);
            }
        }
    })
    svgField.addEventListener('mouseup', (e) => {
        isDrawingStarted = false;
    });

    //-----------------------SVG ПЕРЕТАСКИВАНИЕ, УДАЛЕНИЕ, ИЗМЕНЕНИЕ------------------------------
    let selectedElement;
    let startX, startY;
    let offset = { x: 0, y: 0 };
    let chosedElement;

    svgField.addEventListener('mousedown', evt => {
        if (!isDrawingMode) {
            if (evt.target.classList.contains("dragRect") || evt.target.classList.contains("dragCircle")) {
                selectedElement = evt.target;
                makeDraggable(evt);
            }
        }
    });
    svgField.addEventListener('dblclick', evt => {
        if (!isDrawingMode) {
            if (evt.target.classList.contains("dragRect") || evt.target.classList.contains("dragCircle")) {
                selectedElement = evt.target;
                chooseElement(evt);
            }
        }
    });

    let isDragging = false;

    function makeDraggable(evt) {
        isDragging = true;
        startDrag(evt);
        evt.target.addEventListener('mousemove', doDrag);
        evt.target.addEventListener('mouseup', endDrag);
        evt.target.addEventListener('dblclick', chooseElement);
    }

    function startDrag(evt) {
        if (isDragging) {
            offset = getMousePosition(evt);
            if (selectedElement.classList.contains("dragRect")) {
                startX = parseFloat(selectedElement.getAttributeNS(null, "x"));
                startY = parseFloat(selectedElement.getAttributeNS(null, "y"));

                offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
                offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
            } else {
                startX = parseFloat(selectedElement.getAttributeNS(null, "cx"));
                startY = parseFloat(selectedElement.getAttributeNS(null, "cy"));

                offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"));
                offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"));
            }
        }
    }

    function doDrag(evt) {
        if (isDragging) {
            evt.preventDefault();
            let position = getMousePosition(evt);
            if (selectedElement && selectedElement.classList.contains("dragRect")) {
                selectedElement.setAttributeNS(null, "x", position.x - offset.x);
                selectedElement.setAttributeNS(null, "y", position.y - offset.y);
            }
            if (selectedElement && selectedElement.classList.contains("dragCircle")) {
                selectedElement.setAttributeNS(null, "cx", position.x - offset.x);
                selectedElement.setAttributeNS(null, "cy", position.y - offset.y);
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (selectedElement.classList.contains("dragRect")) {
                        selectedElement.setAttributeNS(null, "x", startX);
                        selectedElement.setAttributeNS(null, "y", startY);
                    }
                    if (selectedElement && selectedElement.classList.contains("dragCircle")) {
                        selectedElement.setAttributeNS(null, "cx", startX);
                        selectedElement.setAttributeNS(null, "cy", startY);
                    }
                    isDragging = false;
                }
            })
        }
    }

    function endDrag(evt) {
        selectedElement = null;
        isDragging = false;
    }

    function getMousePosition(evt) {
        let CTM = svgField.getScreenCTM()
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        }
    }

    function chooseElement(evt) {
        if (selectedElement) {
            if (selectedElement.classList.contains("chosen")) {
                selectedElement.classList.remove("chosen");
                chosedElement = null;
                selectedElement = null;
            }
        }

        if (selectedElement) {
            removeChosen();
            selectedElement.classList.add("chosen");
            chosedElement = selectedElement;
        }
    }

    function removeChosen() {
        let rectangles = document.querySelectorAll('rect');
        let circles = document.querySelectorAll('circle');
        for (let i = 0; i < rectangles.length; i++) {
            rectangles[i].classList.remove("chosen");
        }
        for (let i = 0; i < circles.length; i++) {
            circles[i].classList.remove("chosen");
        }
    }

    document.addEventListener('keydown', ev => {
        if (chosedElement) {
            if (ev.key === 'Delete') {
                svgField.removeChild(chosedElement);
            }
        }
    });

    inputFillingColor.addEventListener("input", evt1 => {
        if (chosedElement) {
            chosedElement.setAttribute("fill", inputFillingColor.value);
        }
    });
    inputBorderColor.addEventListener("input", evt1 => {
        if (chosedElement) {
            chosedElement.setAttribute("stroke", inputBorderColor.value);
        }
    });
    slctBorderWidth.addEventListener("change", evt1 => {
        if (chosedElement) {
            chosedElement.setAttribute("stroke-width", slctBorderWidth.value);
        }
    });

    //-----------------------CANVAS РИСОВАНИЕ------------------------------
    context.lineJoin = 'round';
    context.lineCap = 'round';
    let startPosition = { x: 0, y: 0 };
    let endPosition = { x: 0, y: 0 };
    let figureWidth = 0;
    let figureHeight = 0;
    let figureRadius = 0;

    function getClientOffset(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        return { x, y }
    }

    canvasField.addEventListener('mousedown', event => {
        if (isDrawingMode) {
            startPosition = getClientOffset(event);
            isDrawingStarted = true;
        }
    });
    canvasField.addEventListener('mousemove', event => {
        if (!isDrawingStarted || activeField !== "Canvas") return;
        if (isDrawingMode) {
            endPosition = getClientOffset(event);
            figureWidth = endPosition.x - startPosition.x;
            figureHeight = endPosition.y - startPosition.y;
            figureRadius = Math.sqrt(Math.pow(endPosition.x - startPosition.x, 2) + Math.pow(endPosition.y - startPosition.y, 2));
            clearCanvas();
            if (activeFigure === "rectangle") drawRectangle(startPosition.x, startPosition.y, figureWidth, figureHeight,
                inputFillingColor.value, inputBorderColor.value, slctBorderWidth.value);
            if (activeFigure === "circle") drawCircle(startPosition.x, startPosition.y, figureRadius,
                inputFillingColor.value, inputBorderColor.value, slctBorderWidth.value);
        }
    });
    canvasField.addEventListener('mouseup', event => {
        if (isDrawingMode) {
            if (activeFigure === "rectangle") {
                figures.push({
                    isRect: true, x: startPosition.x, y: startPosition.y,
                    width: figureWidth, height: figureHeight, radius: 0,
                    color: inputFillingColor.value, lineColor: inputBorderColor.value, lineSize: slctBorderWidth.value
                });
            }
            if (activeFigure === "circle") {
                figures.push({
                    isRect: false, x: startPosition.x, y: startPosition.y,
                    width: 0, height: 0, radius: figureRadius,
                    color: inputFillingColor.value, lineColor: inputBorderColor.value, lineSize: slctBorderWidth.value
                });
            }
            isDrawingStarted = false;
        }
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
        context.clearRect(0, 0, canvasField.width, canvasField.height);
        figures.forEach((item, i) => {
            if (item.isRect) {
                drawRectangle(item.x, item.y, item.width, item.height, item.color, item.lineColor, item.lineSize);
            } else {
                drawCircle(item.x, item.y, item.radius, item.color, item.lineColor, item.lineSize);
            }
        });
    }
}