import { delay as coreDelay } from "@azure/core-http";

/**
 * A simple abstraction to retry, and exponentially de-escalate retrying, a
 * given async function until it is fulfilled.
 * @param {() => Promise<T>} target The async function you want to retry
 * @param {number} delay The delay between each retry, defaults to 1000
 * @param {number} timeout Maximum time we'll let this lapse before we quit retrying, defaults to Infinity
 * @param {number} increaseFactor Increase factor of each retry, defaults to 1
 * @returns {Promise<any>} Resolved promise
 */
export async function retry<T>(
  target: () => Promise<T>,
  delay: number = 1000,
  timeout: number = Infinity,
  increaseFactor: number = 1
): Promise<any> {
  const start = new Date().getTime();
  let updatedDelay = delay;
  while (new Date().getTime() - start < timeout) {
    try {
      return await target();
    } catch {
      await coreDelay(updatedDelay);
      updatedDelay *= increaseFactor;
    }
  }
  return null;
}
