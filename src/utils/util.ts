// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
export const scale = (
  n: number,
  inMin: number,
  inMax: number,
  outerMin: number,
  outerMax: number
) => ((n - inMin) * (outerMax - outerMin)) / (inMax - inMin) + outerMin;
/**
 *
 * @param fn
 * @param delay
 * @returns
 */
export function throttle(fn: Function, delay: number) {
  let timer: any = null,
    last: number = 0;
  return function <T>(this: Function, ...args: Array<T>) {
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
