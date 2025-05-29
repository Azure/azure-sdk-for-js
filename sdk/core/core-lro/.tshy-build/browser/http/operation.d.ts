import type { HttpOperationMode, RunningOperation, ResourceLocationConfig, OperationResponse, RawResponse } from "./models.js";
import type { LroError, OperationConfig, OperationState, OperationStatus, RestorableOperationState } from "../poller/models.js";
import type { AbortSignalLike } from "@azure/abort-controller";
export declare function inferLroMode(rawResponse: RawResponse, resourceLocationConfig?: ResourceLocationConfig, skipFinalGet?: boolean): (OperationConfig & {
    mode: HttpOperationMode;
}) | undefined;
export declare function parseRetryAfter<T>({ rawResponse }: OperationResponse<T>): number | undefined;
export declare function getErrorFromResponse<T>(response: OperationResponse<T>): LroError | undefined;
export declare function getStatusFromInitialResponse<TResult, TState extends OperationState<TResult>>(inputs: {
    response: OperationResponse<unknown>;
    state: RestorableOperationState<TResult, TState>;
    operationLocation?: string;
}): OperationStatus;
export declare function getOperationLocation<TResult, TState extends OperationState<TResult>>({ rawResponse }: OperationResponse, state: RestorableOperationState<TResult, TState>): string | undefined;
export declare function getOperationStatus<TResult, TState extends OperationState<TResult>>({ rawResponse }: OperationResponse, state: RestorableOperationState<TResult, TState>): OperationStatus;
export declare function getResourceLocation<TResult, TState extends OperationState<TResult>>(res: OperationResponse, state: RestorableOperationState<TResult, TState>): string | undefined;
export declare function isOperationError(e: Error): boolean;
/** Polls the long-running operation. */
export declare function pollHttpOperation<TState extends OperationState<TResult>, TResult>(inputs: {
    lro: RunningOperation;
    processResult?: (result: unknown, state: TState) => Promise<TResult>;
    updateState?: (state: TState, lastResponse: OperationResponse) => void;
    isDone?: (lastResponse: OperationResponse, state: TState) => boolean;
    setDelay: (intervalInMs: number) => void;
    options?: {
        abortSignal?: AbortSignalLike;
    };
    state: RestorableOperationState<TResult, TState>;
    setErrorAsResult: boolean;
}): Promise<void>;
//# sourceMappingURL=operation.d.ts.map