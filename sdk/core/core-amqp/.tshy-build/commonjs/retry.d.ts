import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Describes the Retry Mode type
 */
export declare enum RetryMode {
    Exponential = 0,
    Fixed = 1
}
/**
 * Describes the retry operation type.
 */
export declare enum RetryOperationType {
    cbsAuth = "cbsAuth",
    connection = "connection",
    management = "management",
    receiverLink = "receiverLink",
    senderLink = "senderLink",
    sendMessage = "sendMessage",
    receiveMessage = "receiveMessage",
    session = "session",
    messageSettlement = "settlement"
}
/**
 * Retry policy options that determine the mode, number of retries, retry interval etc.
 */
export interface RetryOptions {
    /**
     * Number of times the operation needs to be retried in case
     * of retryable error. Default: 3.
     */
    maxRetries?: number;
    /**
     * Amount of time to wait in milliseconds before making the
     * next attempt. Default: `30000 milliseconds`.
     * When `mode` option is set to `Exponential`,
     * this is used to compute the exponentially increasing delays between retries.
     */
    retryDelayInMs?: number;
    /**
     * Number of milliseconds to wait before declaring that current attempt has timed out which will trigger a retry
     * A minimum value of `60000` milliseconds will be used if a value not greater than this is provided.
     */
    timeoutInMs?: number;
    /**
     * Denotes which retry mode to apply. If undefined, defaults to `Fixed`
     */
    mode?: RetryMode;
    /**
     * Denotes the maximum delay between retries
     * that the retry attempts will be capped at. Applicable only when performing exponential retry.
     */
    maxRetryDelayInMs?: number;
}
/**
 * Describes the parameters that need to be configured for the retry operation.
 */
export interface RetryConfig<T> {
    /**
     * The operation that needs to be retried.
     */
    operation: () => Promise<T>;
    /**
     * The connection identifier. Used in logging information.
     * Extremely useful when multiple connections are logged in the same file.
     */
    connectionId: string;
    /**
     * The name/type of operation to be performed.
     * Extremely useful in providing better debug logs.
     */
    operationType: RetryOperationType;
    /**
     * The host "<yournamespace>.servicebus.windows.net".
     * Used to check network connectivity.
     */
    connectionHost?: string;
    /**
     * The retry related options associated with given operation execution.
     */
    retryOptions?: RetryOptions;
    /**
     * The `AbortSignal` associated with the operation being retried on.
     * If this signal is fired during the wait time between retries, then the `retry()` method will ensure that the wait is abandoned and the retry process gets cancelled. If this signal is fired when the operation is in progress, then the operation is expected to react to it.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Every operation is attempted at least once. Additional attempts are made if the previous attempt failed
 * with a retryable error. The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * If `mode` option is set to `Fixed`, then the retries are made on the
 * given operation for a specified number of times, with a fixed delay in between each retry each time.
 *
 * If `mode` option is set to `Exponential`, then the delay between retries is adjusted to increase
 * exponentially with each attempt using back-off factor of power 2.
 *
 * @param config - Parameters to configure retry operation
 *
 * @returns Promise<T>.
 */
export declare function retry<T>(config: RetryConfig<T>): Promise<T>;
//# sourceMappingURL=retry.d.ts.map