/**
 * It will attempt to linearly retry an operation specified number of times with a specified
 * delay in between each retry. The retries will only happen if the error is retryable.
 *
 * @param {Promise<T>} operation    The operation that needs to be retried.
 * @param {number} [times]          Number of times the operation needs to be retried in case of error. Default: 3.
 * @param {number} [delayInSeconds] Amount of time to wait in seconds before making the next attempt. Default: 15.
 *
 * @return {Promise<T>} Promise<T>.
 */
export declare function retry<T>(operation: () => Promise<T>, times?: number, delayInSeconds?: number): Promise<T>;
