import "./style.css";
import { upperFirstChar } from "./modules/utilities";
import type { Words } from "./types";
import setTimer from "./modules/timer";
import { setModal, openModal, closeModal } from "./modules/modal";

export let over: boolean = false;

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
const modalButton: HTMLElement = document.querySelector('.modal_btn') as HTMLElement

let start: boolean = false;

setModal(modal);
document.addEventListener("keydown", handleDocumentKeydown);
modalButton.addEventListener('click', toMenu)

const words: Words = {
  short: "привет меня зовут султанбек",
  long: "",
};

let userTyping = "";
const wordsToType: string = words.short;

if (modes) {
  modes.forEach((mode: Element) => {
    mode.addEventListener("click", handleModeClick);
  });
}

if (keys) {
  keys.forEach((key: HTMLElement) => {
    const keyValue: string = key.dataset.key as string;
    if (keyValue.toLowerCase() !== "space") {
      key.textContent =
        keyValue.length > 1 ? upperFirstChar(keyValue) : keyValue;
    }
  });
}

toggleSentence();

function handleModeClick(e: Event): void {
  if (e.target) {
    const wordType: string | undefined = (e.target as HTMLElement).dataset.type;
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
    if (e.key === undoneWords.textContent[0]) {
      console.log(undoneWords.textContent.slice(1));
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
}


function toMenu(): void {

}