import { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { Client, PathUncheckedResponse } from "@azure-rest/core-client";
import { AbortSignalLike } from "@azure/abort-controller";
export interface GetLongRunningPollerOptions<TResponse> {
    /** Delay to wait until next poll, in milliseconds. */
    updateIntervalInMs?: number;
    /**
     * The signal which can be used to abort requests.
     */
    abortSignal?: AbortSignalLike;
    /**
     * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
     */
    resourceLocationConfig?: ResourceLocationConfig;
    /**
     * The original url of the LRO
     * Should not be null when restoreFrom is set
     */
    initialRequestUrl?: string;
    /**
     * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
     */
    restoreFrom?: string;
    /**
     * The function to get the initial response
     */
    getInitialResponse?: () => PromiseLike<TResponse>;
}
export declare function getLongRunningPoller<TResponse extends PathUncheckedResponse, TResult = void>(client: Client, processResponseBody: (result: TResponse) => Promise<TResult>, expectedStatuses: string[], options: GetLongRunningPollerOptions<TResponse>): PollerLike<OperationState<TResult>, TResult>;
//# sourceMappingURL=pollingHelpers.d.ts.map