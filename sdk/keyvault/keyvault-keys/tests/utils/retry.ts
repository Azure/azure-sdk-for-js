import { delay } from "@azure/core-http";

export type RetryFunction = () => Promise<any>;
export type RetryErrorValidator = (e: Error) => boolean;
export interface RetryOptions {
  retries: number;
  factor: number;
  minTimeout: number;
  maxTimeout: number;
  isExpectedError: RetryErrorValidator;
}

/**
 * A simple abstraction to retry, and exponentially de-escalate retrying, a
 * given async function until it is fulfileld.
 * @param {RetryFunction} target The async function you want to retry.
 * @param {RetryOptions} options An object with configuration values.
 * @returns {Promise<any>} Resolved promise
 */
export async function retry(
  target: RetryFunction,
  {
    retries = 10,
    factor = 2,
    minTimeout = 1000,
    maxTimeout = Infinity,
    isExpectedError = (_) => false
  }: RetryOptions
): Promise<any> {
  let timeout = minTimeout;
  let error: any;

  while (retries > 0 && timeout < maxTimeout) {
    try {
      return await target();
    } catch (e) {
      if (!isExpectedError(e)) error = e;
		  error = e;
    }
    if (retries) await delay(timeout);
    retries--;
    timeout *= factor;
  }

  if (error) throw error;
}
