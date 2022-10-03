var isRect=false;
var isCircle=true;

window.onload = () => {

  const canvas = document.getElementById('canvas'); //холст
  const context = canvas.getContext('2d'); //контекст

  canvas.setAttribute('width', window.innerWidth); //по ширине окна
  canvas.setAttribute('height', window.innerHeight); //по высоте окна

  context.lineWidth = 5; //толщина линии
  context.lineJoin = 'round'; //определяет форму вершин в которых линии сходятся
  context.lineCap = 'round'; //определяет, как будут выглядеть концы нарисованных линий
  context.strokeStyle = 'black'; //цвет или стиль, используемый при выполнении обводки фигур
  context.fillStyle = 'white'; //цвет или стиль, используемый при заливке фигур

  let isDrawStart = false;
  let startPosition = {x: 0, y: 0};
  let endPosition = {x: 0, y: 0};

  canvas.addEventListener('mousedown', mouseDownListener);
  canvas.addEventListener('mousemove', mouseMoveListener);
  canvas.addEventListener('mouseup', mouseUpListener);

  //расчет положения мышки в пределах холста
  //если у холста будет смещение
  function getClientOffset(event){
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    return {x,y}
  }

  function mouseDownListener(event){
   startPosition = getClientOffset(event);
   isDrawStart = true;
 }

  function mouseMoveListener(event){
    if(!isDrawStart) return;

    endPosition = getClientOffset(event);
    const width = endPosition.x - startPosition.x;
    const height = endPosition.y - startPosition.y;
    const radius = Math.abs(endPosition.x - startPosition.x);
    clearCanvas();
    if(isRect) drawRectangle(width, height);
    else drawCircle(radius);
  }

  function drawRectangle(width, height){
    context.beginPath();
    context.rect(startPosition.x, startPosition.y, width, height);
    context.stroke();
    context.fill();
  }

  function drawCircle(radius){
    context.beginPath();
    context.arc(startPosition.x, startPosition.y, radius, 0, 2*Math.PI);
    context.stroke();
    context.fill();
  }

  function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function mouseUpListener(event){
    isDrawStart = false;
  }

}

function rect(){
  isRect=true;
  isCircle=false;
}

function circ(){
  isCircle=true;
  isRect=false;
}
