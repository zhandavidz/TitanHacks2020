var isMoving = false;
var pos = 0;

function startLeft() {
    console.log("left");
    isMoving = true;
    while (isMoving) {
        $("img#player").css("left", pos - 1);
        pos--;
    }
}
function stopLeft() {
    console.log("left");
    isMoving = false;
}
function startRight() {
    console.log("left");
    isMoving = true;
    while (isMoving) {
        $("img#player").css("left", pos + 1);
        pos++;
    }
}
function stopRight() {
    console.log("left");
    isMoving = false;
}