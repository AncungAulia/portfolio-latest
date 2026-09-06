import { INTRO_TIMELINE } from "../intro.config";

const CRITICAL_SELECTOR = "img[data-intro-critical]";

function wait(seconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

function imagesReady() {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(CRITICAL_SELECTOR),
  );

  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  ).then(() => undefined);
}

export function assetsReady(): Promise<void> {
  const fonts = document.fonts
    ? document.fonts.ready.then(() => undefined)
    : Promise.resolve();

  return Promise.race([
    Promise.all([fonts, imagesReady()]).then(() => undefined),
    wait(INTRO_TIMELINE.assetsTimeout),
  ]);
}
