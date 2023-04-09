import "./style.css";
import { upperFirstChar } from "./modules/utilities";
import type { Words } from "./types";
import setTimer from "./modules/timer";
import { setModal, openModal, closeModal } from "./modules/modal";

export let over: boolean = false;

const content: HTMLElement = document.querySelector(".content") as HTMLElement;
const modesContainer: HTMLElement = document.querySelector(
  ".modes"
) as HTMLElement;
const modes: NodeListOf<Element> | null = document.querySelectorAll(".mode");
const keys: NodeListOf<HTMLElement> | null = document.querySelectorAll(".key");
const startIntroduction: HTMLElement | null = document.querySelector(".start");
const sentence: HTMLElement = document.querySelector(
  ".sentences"
) as HTMLElement;
const doneWords: Element = sentence.firstElementChild!;
const undoneWords: Element = sentence.lastElementChild!;
const timer: Element | null = document.querySelector(".timer");
const modal: HTMLElement = document.querySelector(
  ".modal_wrapper"
) as HTMLElement;
const modalButton: HTMLElement = document.querySelector(
  ".model_btn"
) as HTMLElement;

let start: boolean = false;

setModal(modal);
document.addEventListener("keydown", handleDocumentKeydown);
modalButton.addEventListener("click", toMenu);

const words: Words = {
  short: "привет меня зовут султанбек",
  long: "ооочееень длинннноееее соооообббщееениииеее",
};

let userTyping = "";
let wordsToType: string = "";

if (modes) {
  modes.forEach((mode: Element) => {
    mode.addEventListener("click", handleModeClick);
  });
}

if (keys) {
  keys.forEach((key: HTMLElement) => {
    const keyValue: string = key.dataset.key as string;
    if (keyValue.toLowerCase() !== " ") {
      key.textContent =
        keyValue.length > 1 ? upperFirstChar(keyValue) : keyValue;
    }
  });
}

toggleSentence();

function handleModeClick(e: Event): void {
  if (e.target) {
    modesContainer.style.display = "none";
    content.style.display = "flex";
    const wordType: keyof typeof words = (e.target as HTMLElement).dataset
      .type as keyof typeof words;
    wordsToType = words[wordType];
    console.log(wordsToType);
  }
}

function handleDocumentKeydown(e: KeyboardEvent): void {
  if (!start) {
    if (e.code === "Space") {
      start = true;
      hideStartIntroduction();
      toggleSentence();
      setTimer(timer as HTMLElement);
    }
  }

  if (undoneWords.textContent) {
    if (!undoneWords.textContent[1]) {
      finishExercise();
    }

    if (e.key === undoneWords.textContent[0]) {
      undoneWords.textContent = undoneWords.textContent.slice(1);
      userTyping += e.key;
      doneWords.textContent = userTyping;

      if (undoneWords.textContent[0] === " ") {
        (undoneWords as HTMLElement).style.paddingLeft = "10px";
      } else {
        (undoneWords as HTMLElement).style.paddingLeft = "0px";
      }

      if (doneWords.textContent[doneWords.textContent.length - 1] === " ") {
        (doneWords as HTMLElement).style.paddingRight = "10px";
      } else {
        (doneWords as HTMLElement).style.paddingRight = "0px";
      }
    }

    keys?.forEach((key: HTMLElement) => {
      if (undoneWords.textContent) {
        if (key.dataset.key === undoneWords.textContent[0]) {
          key.style.backgroundColor = "red";
        } else {
          key.style.backgroundColor = "";
        }
      }
    });
  }
}

function hideStartIntroduction(): void {
  if (startIntroduction) {
    startIntroduction.style.display = "none";
  }
}

function toggleSentence(): void {
  if (sentence) {
    if (!start) {
      sentence.style.display = "none";
    } else {
      sentence.style.display = "flex";
      undoneWords.textContent = wordsToType;
    }
  }
}

function finishExercise(): void {
  over = true;
  openModal(modal);
  const modalTimer: HTMLElement = modal.querySelector(
    ".overtime"
  ) as HTMLElement;
  if (timer?.textContent) {
    const [minutes, seconds] = timer.textContent.split(":");
    function formattedMinutes(): string {
      if (Number(minutes[1]) === 0) {
        return "";
      }

      if (Number(minutes[0]) > 0) {
        return `${minutes} минут и `;
      } else {
        return `${minutes[1]} минут и `;
      }
    }
    function formattedSeconds(): string {
      if (Number(seconds[1]) === 0) {
        return "";
      }

      if (Number(seconds[0]) > 0) {
        return `${seconds} секунд`;
      } else {
        return `${seconds[1]} секунд`;
      }
    }
    if (!formattedMinutes() && !formattedSeconds()) {
      modalTimer.textContent = "0 секунд";
    }

    modalTimer.textContent = `${formattedMinutes()}${formattedSeconds()}`;
  }
}

function toMenu(): void {
  start = false;
  closeModal(modal);
  content.style.display = "none";
  modesContainer.style.display = "flex";
}
