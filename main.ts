let score_p = document.getElementById("score_p");

let count: number;
const countStr = localStorage.getItem("count");

if (!countStr) {
  count = 0;
  if (score_p !== null) {
    score_p.innerHTML = String(count);
  }
  localStorage.setItem("count", JSON.stringify(count));
} else {
  const parsed = JSON.parse(countStr);
  if (parsed !== null) {
    count = Number(parsed);
    if (score_p !== null) {
      score_p.innerHTML = String(count);
    }
  }
}

let reset_button = document.getElementById(
  "reset_button_id"
) as HTMLButtonElement | null;
reset_button?.addEventListener("click", () => {
  count = 0;
  if (score_p !== null) {
    score_p.innerHTML = String(count);
  }
  localStorage.setItem("count", JSON.stringify(count));
});

let rules_button = document.getElementById(
  "rules_button_id"
) as HTMLButtonElement | null;
rules_button?.addEventListener("click", () => {
  let grey_screen = document.querySelector(".grey_screen") as HTMLDivElement;
  grey_screen.style.display = "flex";

  let exit_rules_button = document.getElementById(
    "exit_rules_id"
  ) as HTMLButtonElement | null;
  exit_rules_button?.addEventListener("click", () => {
    grey_screen.style.display = "none";
  });
});

interface IGameHands {
  userHand: hands;
  userCanWin: hands[];
}

enum hands {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
  Lizard = "lizard",
  Spock = "spock",
}

let paperb = document.getElementById(
  "paper_button_id"
) as HTMLDivElement | null;
paperb?.addEventListener("click", () => {
  buttle({ userHand: hands.Paper, userCanWin: [hands.Rock, hands.Spock] });
});

let rockb = document.getElementById("rock_button_id") as HTMLDivElement | null;
rockb?.addEventListener("click", () => {
  buttle({ userHand: hands.Rock, userCanWin: [hands.Scissors, hands.Lizard] });
});

let scissorsb = document.getElementById(
  "scissors_button_id"
) as HTMLDivElement | null;
scissorsb?.addEventListener("click", () => {
  buttle({ userHand: hands.Scissors, userCanWin: [hands.Paper, hands.Lizard] });
});
let lizardb = document.getElementById(
  "lizard_button_id"
) as HTMLDivElement | null;
lizardb?.addEventListener("click", () => {
  buttle({ userHand: hands.Lizard, userCanWin: [hands.Paper, hands.Spock] });
});
let spockb = document.getElementById(
  "spock_button_id"
) as HTMLDivElement | null;
spockb?.addEventListener("click", () => {
  buttle({ userHand: hands.Spock, userCanWin: [hands.Scissors, hands.Rock] });
});

const buttle = (arg: IGameHands) => {
  let step_one = document.querySelector(".step_one") as HTMLDivElement;
  step_one.style.display = "none";

  let left_bubble = document.getElementById(
    "left_bubble"
  ) as HTMLDivElement | null;
  left_bubble?.classList.add(arg["userHand"]);

  let right_bubble = document.getElementById(
    "right_bubble"
  ) as HTMLDivElement | null;
  right_bubble?.classList.add("grey");

  let step_twonthree = document.querySelector(
    ".step_twonthree"
  ) as HTMLDivElement;
  step_twonthree.style.display = "flex";

  setTimeout(() => {
    let randomNum: number = Math.floor(
      Math.random() * Object.keys(hands).length
    );
    let pcChoice: string = Object.keys(hands)[randomNum];

    right_bubble?.classList.remove("grey");
    right_bubble?.classList.add(hands[pcChoice]);

    let result_value: string = "";

    if (Object.values(arg.userCanWin).includes(hands[pcChoice])) {
      result_value = "YOU WIN";
    } else if (hands[pcChoice] === arg["userHand"]) {
      result_value = "IT'S A TIE";
    } else {
      result_value = "YOU LOSE";
    }

    setTimeout(() => {
      let result_notice_span_id = document.getElementById(
        "result_notice_span_id"
      ) as HTMLSpanElement;
      result_notice_span_id.innerHTML = result_value;

      let center_msg = document.querySelector(".center_msg") as HTMLDivElement;
      center_msg.style.display = "flex";

      if (window.innerWidth > 800) {
        let headlines_step_twonthree = document.querySelector(
          ".headlines_step_twonthree"
        ) as HTMLDivElement;
        headlines_step_twonthree.style.gap = "40vw";

        let bubbles_div_step_twonthree = document.querySelector(
          ".bubbles_div_step_twonthree"
        ) as HTMLDivElement;
        bubbles_div_step_twonthree.style.gap = "40vw";
      }

      let fading = document.querySelectorAll(".fading");

      if (result_value === "YOU WIN") {
        count++;
        if (score_p !== null) {
          score_p.style.color = "#2db865";
        }

        for (const element of fading) {
          (element as HTMLElement).style.display = "unset";
          if (window.innerWidth < 800) {
            (element as HTMLElement).style.left = "-344px";
          } else {
            (element as HTMLElement).style.left = "-322px";
          }
        }
      } else if (result_value === "YOU LOSE") {
        count--;
        if (score_p !== null) {
          score_p.style.color = "#C94D5D";
        }

        for (const element of fading) {
          (element as HTMLElement).style.display = "unset";
          if (window.innerWidth < 800) {
            (element as HTMLElement).style.right = "-344px";
          } else {
            (element as HTMLElement).style.right = "-322px";
          }
        }
      }

      setTimeout(() => {
        if (score_p !== null) {
          score_p.style.color = "#56546B";
        }
      }, 1000);

      if (score_p !== null) {
        score_p.innerHTML = String(count);
      }
      localStorage.setItem("count", JSON.stringify(count));

      let play_again_button_idules_button = document.getElementById(
        "play_again_button_id"
      ) as HTMLButtonElement | null;
      play_again_button_idules_button?.addEventListener("click", () => {
        for (const element of fading) {
          (element as HTMLElement).style.display = "none";
          (element as HTMLElement).style.right = "none";
          (element as HTMLElement).style.left = "none";
        }
        window.location.reload();
      });
    }, 1000);
  }, 1000);
};
