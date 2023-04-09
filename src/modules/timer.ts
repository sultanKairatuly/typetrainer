import { over } from "../main";

export default function setTimer(el: HTMLElement): void {
  el.textContent = "00:00";
  const interval: number = setInterval(() => {
    if (!over) {
      let [minutes, seconds] = (el.textContent as string).split(":");
      let updatedSeconds: number = Number(seconds) + 1;
      let updatedMinutes: number | undefined = Number(minutes);
      if (updatedSeconds === 60) {
        updatedMinutes = Number(minutes) + 1;
        updatedSeconds = 0;
      }
      const formattedSeconds: string =
        updatedSeconds <= 9 ? `0${updatedSeconds}` : updatedSeconds.toString();
      const formattedMinutes: string =
        updatedMinutes <= 9
          ? `0${updatedMinutes}`
          : updatedMinutes.toString() ?? "00";

      el.textContent = `${formattedMinutes}:${formattedSeconds}`;
    } else {
      clearInterval(interval);
      console.log('interval stopped')
    }
  }, 1000);
}
