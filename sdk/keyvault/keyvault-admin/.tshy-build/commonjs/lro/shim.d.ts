import type { AbortSignalLike } from "@azure/abort-controller";
import type { CancelOnProgress, OperationState, PollerLike as CorePollerLike } from "@azure/core-lro";
import type { KeyVaultAdminPollOperationState } from "./models.js";
import { FullBackupOperation, RestoreOperation } from "../generated/index.js";
/**
 * A simple poller that can be used to poll a long running operation.
 */
export interface PollerLike<TState extends KeyVaultAdminPollOperationState<TResult>, TResult> {
    /**
     * Returns true if the poller has finished polling.
     */
    isDone(): boolean;
    /**
     * Returns true if the poller is stopped.
     */
    isStopped(): boolean;
    /**
     * Returns the state of the operation.
     */
    getOperationState(): TState;
    /**
     * Returns the result value of the operation,
     * regardless of the state of the poller.
     * It can return undefined or an incomplete form of the final TResult value
     * depending on the implementation.
     */
    getResult(): TResult | undefined;
    /**
     * Returns a promise that will resolve once a single polling request finishes.
     * It does this by calling the update method of the Poller's operation.
     */
    poll(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
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
     * Returns a string representation of the poller's operation. Similar to serialize but returns a string.
     */
    toString(): string;
    /**
     * Stops the poller from continuing to poll. Please note this will only stop the client-side polling
     */
    stopPolling(): void;
}
export declare function wrapPoller<TState extends OperationState<TResult>, TResult>(httpPoller: CorePollerLike<TState, TResult>): Promise<PollerLike<TState, TResult>>;
/**
 * A helper that standardizes the shape of the result of a long-running operation.
 *
 * smoothing over the differences between `null` and `undefined` sent over the wire in responses.
 */
export declare function updateState(state: OperationState<RestoreOperation | FullBackupOperation>): void;
//# sourceMappingURL=shim.d.ts.map