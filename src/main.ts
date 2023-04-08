import "./style.css";
import { upperFirstChar } from "./modules/utilities";
import type { Words } from "./types";

const content: Element | null = document.querySelector(".content");
const modes: NodeListOf<Element> | null = document.querySelectorAll(".mode");
const keys: NodeListOf<HTMLElement> | null = document.querySelectorAll(".key");
const startIntroduction: HTMLElement | null = document.querySelector(".start");
let start: boolean = false;

document.addEventListener("keydown", handleDocumentKeydown);

const words: Words = {
  short: ["привет меня зовут султанбек"],
  long: [],
};
const wordsToType: string[] = words.short;

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

function handleModeClick(e: Event): void {
  if (e.target) {
    const wordType: string | undefined = (e.target as HTMLElement).dataset.type;
    console.log(wordType);
  }
}

function handleDocumentKeydown(e: KeyboardEvent): void {
  if (e.code === "Space") {
    start = true;
    hideStartIntroduction();
  }
}

function hideStartIntroduction(): void {
  if (startIntroduction) {
    startIntroduction.style.display = "none";
  }
}

