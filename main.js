var score_p = document.getElementById("score_p");
var count;
var countStr = localStorage.getItem("count");
if (!countStr) {
    count = 0;
    localStorage.setItem("count", JSON.stringify(count));
}
else {
    var parsed = JSON.parse(countStr);
    if (parsed !== null) {
        count = Number(parsed);
        if (score_p !== null) {
            score_p.innerHTML = String(count);
        }
    }
}
var reset_button = document.getElementById("reset_button_id");
reset_button === null || reset_button === void 0 ? void 0 : reset_button.addEventListener("click", function () {
    count = 0;
    if (score_p !== null) {
        score_p.innerHTML = String(count);
    }
    localStorage.setItem("count", JSON.stringify(count));
});
var rules_button = document.getElementById("rules_button_id");
rules_button === null || rules_button === void 0 ? void 0 : rules_button.addEventListener("click", function () {
    var grey_screen = document.querySelector(".grey_screen");
    grey_screen.style.display = "flex";
    var exit_rules_button = document.getElementById("exit_rules_id");
    exit_rules_button === null || exit_rules_button === void 0 ? void 0 : exit_rules_button.addEventListener("click", function () {
        grey_screen.style.display = "none";
    });
});
var hands;
(function (hands) {
    hands["Rock"] = "rock";
    hands["Paper"] = "paper";
    hands["Scissors"] = "scissors";
})(hands || (hands = {}));
var paperb = document.getElementById("paper_button_id");
paperb === null || paperb === void 0 ? void 0 : paperb.addEventListener("click", function () {
    buttle({ userHand: hands.Paper, userCanWin: [hands.Rock] });
});
var rockb = document.getElementById("rock_button_id");
rockb === null || rockb === void 0 ? void 0 : rockb.addEventListener("click", function () {
    buttle({ userHand: hands.Rock, userCanWin: [hands.Scissors] });
});
var scissorsb = document.getElementById("scissors_button_id");
scissorsb === null || scissorsb === void 0 ? void 0 : scissorsb.addEventListener("click", function () {
    buttle({ userHand: hands.Scissors, userCanWin: [hands.Paper] });
});
var buttle = function (arg) {
    var step_one = document.querySelector(".step_one");
    step_one.style.display = "none";
    var left_bubble = document.getElementById("left_bubble");
    left_bubble === null || left_bubble === void 0 ? void 0 : left_bubble.classList.add(arg["userHand"]);
    var right_bubble = document.getElementById("right_bubble");
    right_bubble === null || right_bubble === void 0 ? void 0 : right_bubble.classList.add("grey");
    var step_twonthree = document.querySelector(".step_twonthree");
    step_twonthree.style.display = "flex";
    setTimeout(function () {
        var randomNum = Math.floor(Math.random() * Object.keys(hands).length);
        var pcChoice = Object.keys(hands)[randomNum];
        right_bubble === null || right_bubble === void 0 ? void 0 : right_bubble.classList.remove("grey");
        right_bubble === null || right_bubble === void 0 ? void 0 : right_bubble.classList.add(hands[pcChoice]);
        var result_value = "";
        if (Object.values(arg.userCanWin).includes(hands[pcChoice])) {
            result_value = "YOU WIN";
        }
        else if (hands[pcChoice] === arg["userHand"]) {
            result_value = "IT'S A TIE";
        }
        else {
            result_value = "YOU LOSE";
        }
        setTimeout(function () {
            var result_notice_span_id = document.getElementById("result_notice_span_id");
            result_notice_span_id.innerHTML = result_value;
            var center_msg = document.querySelector(".center_msg");
            center_msg.style.display = "flex";
            var headlines_step_twonthree = document.querySelector(".headlines_step_twonthree");
            headlines_step_twonthree.style.gap = "40vw";
            var bubbles_div_step_twonthree = document.querySelector(".bubbles_div_step_twonthree");
            bubbles_div_step_twonthree.style.gap = "40vw";
            if (result_value === "YOU WIN") {
                count++;
                if (score_p !== null) {
                    score_p.style.color = "#2db865";
                }
            }
            else if (result_value === "YOU LOSE") {
                count--;
                if (score_p !== null) {
                    score_p.style.color = "#C94D5D";
                }
            }
            setTimeout(function () {
                if (score_p !== null) {
                    score_p.style.color = "#56546B";
                }
            }, 1000);
            if (score_p !== null) {
                score_p.innerHTML = String(count);
            }
            localStorage.setItem("count", JSON.stringify(count));
            var play_again_button_idules_button = document.getElementById("play_again_button_id");
            play_again_button_idules_button === null || play_again_button_idules_button === void 0 ? void 0 : play_again_button_idules_button.addEventListener("click", function () {
                window.location.reload();
            });
        }, 1000);
    }, 1000);
};
