import { Client } from "@azure-rest/core-client";
import { CreateHttpPollerOptions, OperationState, SimplePollerLike } from "@azure/core-lro";
import { StartTranslation202Response, StartTranslationDefaultResponse, StartTranslationLogicalResponse } from "./responses.js";
/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export declare function getLongRunningPoller<TResult extends StartTranslationLogicalResponse | StartTranslationDefaultResponse>(client: Client, initialResponse: StartTranslation202Response | StartTranslationDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;
//# sourceMappingURL=pollingHelper.d.ts.map