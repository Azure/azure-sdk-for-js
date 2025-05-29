import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Configurations for how to poll the operation and to check whether it has
 * terminated.
 */
export interface OperationConfig {
    /** The operation location */
    operationLocation?: string;
    /** The resource location */
    resourceLocation?: string;
    /** The initial request Url  */
    initialRequestUrl?: string;
    /** The request method */
    requestMethod?: string;
    /** metadata about the operation */
    metadata?: Record<string, string>;
}
/**
 * The description of an operation.
 */
export interface Operation<TResponse, TOptions> {
    /**
     * Sends the initiation request and returns, in addition to the response, the
     * operation location, the potential resource location, and a set of metadata.
     */
    init: () => Promise<OperationConfig & {
        response: TResponse;
    }>;
    /**
     * Sends the polling request.
     */
    poll: (location: string, options?: TOptions) => Promise<TResponse>;
}
/**
 * Type of a restorable long-running operation.
 */
export type RestorableOperationState<TResult, T extends OperationState<TResult>> = T & {
    /** The operation configuration */
    config: OperationConfig;
};
/**
 * Options for `createPoller`.
 */
export interface CreatePollerOptions<TResponse, TResult, TState> {
    /**
     * Defines how much time the poller is going to wait before making a new request to the service.
     */
    intervalInMs?: number;
    /**
     * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
     */
    restoreFrom?: string;
    /**
     * A function to process the result of the LRO.
     */
    processResult?: (result: TResponse, state: TState) => Promise<TResult>;
    /**
     * A function to process the state of the LRO.
     */
    updateState?: (state: TState, lastResponse: TResponse) => void;
    /**
     * A function to be called each time the operation location is updated by the
     * service.
     */
    withOperationLocation?: (operationLocation: string) => void;
}
export interface LroError {
    code: string;
    innererror?: InnerError;
    message: string;
}
export interface InnerError {
    code: string;
    message: string;
    innererror?: InnerError;
}
/**
 * Options for `buildCreatePoller`.
 */
export interface BuildCreatePollerOptions<TResponse, TResult, TState extends OperationState<TResult>> {
    /**
     * Gets the status of the operation from the response received when the
     * operation was initialized. Note that the operation could be already in
     * a terminal state at this time.
     */
    getStatusFromInitialResponse: (inputs: {
        response: TResponse;
        state: RestorableOperationState<TResult, TState>;
        operationLocation?: string;
    }) => OperationStatus;
    /**
     * Gets the status of the operation from a response received when the
     * operation was polled.
     */
    getStatusFromPollResponse: (response: TResponse, state: RestorableOperationState<TResult, TState>) => OperationStatus;
    /**
     * Determines if the input error is an operation error.
     */
    isOperationError: (error: Error) => boolean;
    /**
     * Gets the updated operation location from polling responses.
     */
    getOperationLocation?: (response: TResponse, state: RestorableOperationState<TResult, TState>) => string | undefined;
    /**
     * Gets the resource location from a response.
     */
    getResourceLocation: (response: TResponse, state: RestorableOperationState<TResult, TState>) => string | undefined;
    /**
     * Gets from the response the time interval the service suggests the client to
     * wait before sending the next polling request.
     */
    getPollingInterval?: (response: TResponse) => number | undefined;
    /**
     * Extracts an error model from a response.
     */
    getError?: (response: TResponse) => LroError | undefined;
    /**
     * Control whether to throw an exception if the operation failed or was canceled.
     */
    resolveOnUnsuccessful: boolean;
}
/**
 * The set of possible states an operation can be in at any given time.
 */
export type OperationStatus = "notStarted" | "running" | "succeeded" | "canceled" | "failed";
/**
 * While the poller works as the local control mechanism to start triggering and
 * wait for a long-running operation, OperationState documents the status of
 * the remote long-running operation. It gets updated after each poll.
 */
export interface OperationState<TResult> {
    /**
     * The current status of the operation.
     */
    status: OperationStatus;
    /**
     * Will exist if the operation encountered any error.
     */
    error?: Error;
    /**
     * Will exist if the operation produced a result of the expected type.
     */
    result?: TResult;
}
/**
 * CancelOnProgress is used as the return value of a Poller's onProgress method.
 * When a user invokes onProgress, they're required to pass in a function that will be
 * called as a callback with the new data received each time the poll operation is updated.
 * onProgress returns a function that will prevent any further update to reach the original callback.
 */
export type CancelOnProgress = () => void;
/**
 * A poller for an operation.
 */
export interface PollerLike<TState extends OperationState<TResult>, TResult> extends Promise<TResult> {
    /**
     * Is true if the poller has finished polling.
     */
    readonly isDone: boolean;
    /**
     * The state of the operation.
     * It can be undefined if the poller has not been submitted yet.
     */
    readonly operationState: TState | undefined;
    /**
     * The result value of the operation, regardless of the state of the poller.
     * It can be undefined or an incomplete form of the final TResult value
     * depending on the implementation.
     */
    readonly result: TResult | undefined;
    /**
     * Returns a promise that will resolve once a single polling request finishes.
     * It does this by calling the update method of the Poller's operation.
     */
    poll(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<TState>;
    /**
     * Returns a promise that will resolve once the underlying operation is completed.
     */
    pollUntilDone(pollOptions?: {
        abortSignal?: AbortSignalLike;
    }): Promise<TResult>;
    /**
     * Invokes the provided callback after each polling is completed,
     * sending the current state of the poller's operation.
     *
     * It returns a method that can be used to stop receiving updates on the given callback function.
     */
    onProgress(callback: (state: TState) => void): CancelOnProgress;
    /**
     * Returns a promise that could be used for serialized version of the poller's operation
     * by invoking the operation's serialize method.
     */
    serialize(): Promise<string>;
    /**
     * Returns a promise that could be used to check if the poller has been submitted.
     */
    submitted(): Promise<void>;
}
//# sourceMappingURL=models.d.ts.map