import type { AbortSignalLike } from "@azure/abort-controller";
import type { BuildCreatePollerOptions, CreatePollerOptions, Operation, OperationState, PollerLike } from "./models.js";
/**
 * Returns a poller factory.
 */
export declare function buildCreatePoller<TResponse, TResult, TState extends OperationState<TResult>>(inputs: BuildCreatePollerOptions<TResponse, TResult, TState>): (lro: Operation<TResponse, {
    abortSignal?: AbortSignalLike;
}>, options?: CreatePollerOptions<TResponse, TResult, TState>) => PollerLike<TState, TResult>;
//# sourceMappingURL=poller.d.ts.map