// Created By David Zhan and Michael Liu for the TitanHacks 2020 Hackathon
var x = 0;
var scene = 1; // home = 1, store = 2
const MOVE_AMT = 10;
var inventory = [0,0,0,0,0,0];

var isWashingHands = false;
var reps = 0;
var qCount = 0;
var pCount = 0;
var hasWon = false;
var redirect = false;

$(document).keypress(function () {
    // console.log(event.which);
    if (isA(event) && !isWashingHands) {
        if (x > 0) {
            $("img#player").css("left", x - MOVE_AMT);
            $("img#player").css("transform", "scaleX(-1)");
            x -= MOVE_AMT;
        }
        else if (x == 0 && scene == 3) {
            scene++;
            x = 330;
            $("div#scene").css("background-color", "#bdbdbd");
            $("img#player").css("left", 330);
            $(".scene1").hide();
            $(".scene3").hide();
            $(".scene4").show();
            $("#error").hide();
        }
    }
    else if (isD(event) && !isWashingHands) {
        if (x < 650) {
            $("img#player").css("left", x + MOVE_AMT);
            $("img#player").css("transform", "scaleX(1)");
            x += MOVE_AMT;
        }
        else if (x == 650 && scene == 2) {
            if (inventory[0] > 1) {
                error("You don't need that much toilet paper, 1 is enough!");
                resetShelf();
            }
            else if (inventory[1] > 2) {
                error("Leave some water for everyone else!");
                resetShelf();
            }
            else if (inventory[4] > 1) {
                error("Don't take that much soap, you only need 1!");
                resetShelf();
            }
            else if (inventory[5] > 1) {
                error("Don't think so low of yourself, you're not that clumsy! 1 first-aid kit is enough!");
                resetShelf();
            }
            else if (inventory[3] < 2) {
                error("You need to stay indoors for as long as possible, so you'll need to buy at least 2 foods!");
                resetShelf();
            }
            else if (inventory[4] == 0) {
                error("You need 1 soap to wash your hands!");
                resetShelf();
            }
            else {
                scene++;
                x = 580;
                $("#error").hide();
                $("div#scene").css("background-color", "darkkhaki");
                $("img#player").css("left", 580);
                $(".scene2").hide();
                $(".scene1").show();
                $("#task1").hide();
                $(".scene3").show();
                $("img#mask").hide();
            }
        }
    }
    else if (isSpace(event) && !isWashingHands) {
        console.log("select");
        if (scene == 1) {
            // mask
            if (220 <= x && x <= 370) {
                $("img#mask").hide();
                $("img#player").attr("src", "../img/player/mask.png");
            }
            // door
            else if (500 <= x && x <= 650) {
                // mask on
                if ($("img#mask").css('display') == "none") {
                    scene++;
                    x = 0;
                    $("div#scene").css("background-color", "#fc9803");
                    $("img#player").css("left", 0);
                    $(".scene1").hide();
                    $(".scene2").show();
                    $("#error").hide();
                }
                // mask off
                else {
                    error("You need your mask, silly!");
                }
            }
        }
        else if (scene == 2) {
            if (90 <= x && x <= 130 && inventory[0] < 3) {
                inventory[0]++;
                $("img.tp.row" + inventory[0]).hide();
            }
            else if (180 <= x && x <= 210 && inventory[1] < 3) {
                inventory[1]++;
                $("img.water.row" + inventory[1]).hide();
            }
            else if (240 <= x && x <= 280 && inventory[2] < 3) {
                inventory[2]++;
                $("img.candy.row" + inventory[2]).hide();
            }
            else if (310 <= x && x <= 360 && inventory[3] < 3) {
                inventory[3]++;
                $("img.apple.row" + inventory[3]).hide();
            }
            else if (390 <= x && x <= 420 && inventory[4] < 3) {
                inventory[4]++;
                $("img.soap.row" + inventory[4]).hide();
            }
            else if (450 <= x && x <= 540 && inventory[5] < 3) {
                inventory[5]++;
                $("img.firstaid.row" + inventory[5]).hide();
            }
            console.log(inventory);
        }
        else if (scene == 4 && !hasWon) {
            // add soap
            if (240 <= x && x <= 270) {
                $("#task4").hide();
                $("#task5").show();
                $("#error").hide();
                isWashingHands = true;
                $("#repCounter").show();
                $("#repCounter h6").html("REPS: 0/20");
            }
            // not at sink
            else {
                error("Go to the sink!");
            }
        }
    }

    else if (isQ(event) && isWashingHands) {
        if (qCount == pCount) {
            qCount++
        }
    }
    else if (isP(event) && isWashingHands) {
        if (qCount - 1 == pCount) {
            pCount++
            reps++;
            $("#repCounter h6").html("REPS: " + reps + "/20");
            if (reps == 20) {
                // TODO: make link thing
                $("#task5").hide();
                $("#winMessage").show();
                isWashingHands = false;
                $("body").css("color", "#D4A10B");
                $("#repCounter h6").css("color", "#D4A10B");
                $("#task, .controls").hide();
                $("h4").css("text-decoration", "none");
                $("#scene").css("border-color", "#D4A10B");
                $("#title").html("YOU BEAT CORONAVIRUS!");
                hasWon = true;
                setTimeout(
                function() 
                {
                    redirect = true;
                }, 500);
            }
        }
    }
    if (redirect) {
        window.location.assign("../coronainfo");
    }
});


$(document).click(function() {
    if (redirect) {
        window.location.assign("../coronainfo");
    }
});

function error(msg) {
    $("#error").show();
    $("#error h3").html(msg);
}

function resetShelf(msg) {
    inventory = [0,0,0,0,0,0];
    $(".scene2").show();
    x = 0;
    $("img#player").css("left", 0);
}

function isA(event) {
    return event.which == 97 || event.which == 65;
} function isD(event) {
    return event.which == 100 || event.which == 68;
} function isQ(event) {
    return event.which == 113 || event.which == 81;
} function isP(event) {
    return event.which == 112 || event.which == 80;
} function isSpace(event) {
    return event.which == 32;
}
