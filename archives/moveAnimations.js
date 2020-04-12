function moveLeft(currentX, amt) {
    console.log("left");
    $("img#player").css("left", currentX - amt);
}
function moveRight(currentX, amt) {
    console.log("right");
    $("img#player").css("left", currentX + amt);
}

function jump(currentX, amt) {
    console.log("jump");
}

function select(scene, currentX) {
    console.log("select");
    if (scene == 1) {
        // mask
        if (220 <= x && x <= 370) {
            $("img#mask").hide();
            $("img#player").attr("src", "/img/player/mask.png");
        }
        // door
        else if (500 <= x && x <= 650) {
            
        }
    }
}