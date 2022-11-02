[![wakatime](https://wakatime.com/badge/github/Kkotto/JSTraining.svg)](https://wakatime.com/badge/github/Kkotto/JSTraining)

## Lab-1. 
There's canva for drawing. Press Space to show recorded drawings. Press Space again to clear screen. 
Click on screen to open background template picture again. 
Red point in left upper corner (indicator) changes colour on gray when recording is reproducing.
To change background template picture press 'Change' button.

## Lab-2.
Write programm to draw rectangle and circle with holding mouse left button. Use SVG instead on Canva.

Lab-2 v1. implements creating rectangle and circle by 2 points setted by clicking with left button of mouse.
To switch between rectangle and circle click on rectangle and circle buttons. To clear screen click on 'Clear' button.

Lab-2 v2. implements creating rectangle and circle with holding mouse left button.
To switch between rectangle and circle click on rectangle and circle buttons. To clear screen click on 'Clear' button.

## Lab-3.
Write programm to draw rectangle and circle with holding mouse left button. Use Canva instead on SVG.

## Lab-4.
Write program to:
1. Switch between SVG/Canvas/SVG+Canvas layers
    1. When the SVG layer is active, everything on Canvas is not displayed, changing the Canvas layer is not active.
    2. When the Canvas layer is active, everything on the SVG layer is not displayed, changing the layer SVG is not active.
    3. When both layers are active, drawings are displayed on SVG and on Canvas, but changing layers is not available.
2. Cleaning each layer
    1. When active both layers at the same time, this function must be disabled.
3. Element selection: circle and rectangle.
    1. Selected element should be allocated.
    2. Figures must be drawn in all directions.
4. Select the color of the border and fill (at least 6 colors).
    1. Selected element should be allocated.
5. Selecting width of border.
6. SVG layer: selection of the drawn object.
    1. To change the color of the border, the filling color, border width of selected object.
    2. To drag the selected object.
    3. To delete the selected object.
    4. When dragging an object, the esc key should interrupt
       drag and drop the object back to its original state.
7. Canvas layer: drawing simple and straight lines (when holding Shift).
    1. Filling of any one-color closed contour.
