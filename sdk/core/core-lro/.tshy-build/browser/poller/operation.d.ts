import type { LroError, Operation, OperationStatus, RestorableOperationState, OperationState } from "./models.js";
/**
 * Deserializes the state
 */
export declare function deserializeState<TResult, TState extends OperationState<TResult>>(serializedState: string): RestorableOperationState<TResult, TState>;
/**
 * Initiates the long-running operation.
 */
export declare function initOperation<TResponse, TResult, TState extends OperationState<TResult>>(inputs: {
    init: Operation<TResponse, unknown>["init"];
    getOperationStatus: (inputs: {
        response: TResponse;
        state: RestorableOperationState<TResult, TState>;
        operationLocation?: string;
    }) => OperationStatus;
    processResult?: (result: TResponse, state: TState) => Promise<TResult>;
    withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
    setErrorAsResult: boolean;
}): Promise<RestorableOperationState<TResult, TState>>;
/** Polls the long-running operation. */
export declare function pollOperation<TResponse, TResult, TState extends OperationState<TResult>, TOptions>(inputs: {
    poll: Operation<TResponse, TOptions>["poll"];
    state: RestorableOperationState<TResult, TState>;
    getOperationStatus: (response: TResponse, state: RestorableOperationState<TResult, TState>) => OperationStatus;
    getResourceLocation: (response: TResponse, state: RestorableOperationState<TResult, TState>) => string | undefined;
    isOperationError: (error: Error) => boolean;
    getPollingInterval?: (response: TResponse) => number | undefined;
    setDelay: (intervalInMs: number) => void;
    getOperationLocation?: (response: TResponse, state: RestorableOperationState<TResult, TState>) => string | undefined;
    withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
    processResult?: (result: TResponse, state: TState) => Promise<TResult>;
    getError?: (response: TResponse) => LroError | undefined;
    updateState?: (state: TState, lastResponse: TResponse) => void;
    isDone?: (lastResponse: TResponse, state: TState) => boolean;
    setErrorAsResult: boolean;
    options?: TOptions;
}): Promise<void>;
//# sourceMappingURL=operation.d.ts.map