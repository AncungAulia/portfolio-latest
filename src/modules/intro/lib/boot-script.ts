import { INTRO_STORAGE_KEY, SHOW_ON_EVERY_LOAD } from "../intro.config";

export const introBootScript = `(function(){
  var r = document.documentElement;
  var everyLoad = ${SHOW_ON_EVERY_LOAD};
  r.classList.add('intro-js');
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  } catch (e) {}
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      r.classList.add('intro-skip', 'motion-off');
    } else if (!everyLoad && sessionStorage.getItem('${INTRO_STORAGE_KEY}')) {
      r.classList.add('intro-skip');
    }
  } catch (e) {}
})();`;
