import { isBrowser } from "./utils";
const env = isBrowser() ? (window as any).__env__ : process.env;
const isPlayingBack = env.TEST_MODE === "playback";

/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to be delayed.
 * @returns {Promise<T>} Resolved promise
 */
export function delay(milliseconds: number): Promise<void> | null {
  return isPlayingBack ? null : new Promise((resolve) => setTimeout(resolve, milliseconds));
}
