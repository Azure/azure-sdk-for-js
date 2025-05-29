import type { ServiceClient } from "@azure/core-client";
import { type OperationOptions, type OperationSpec } from "@azure/core-client";
import type { LroResponse } from "@azure/core-lro";
/**
 * Extract several fields of the response to the rawResponse
 *
 * @param getResponse - A async function that actually call the backend API.
 * @param options - The options for the getResponse callback
 * @returns A promise for the API call.
 */
export declare function getRawResponse<TOptions extends OperationOptions, TResponse>(getResponse: (options: TOptions) => Promise<TResponse>, options: TOptions): Promise<LroResponse<TResponse>>;
/**
 * Helper function to create a method that can be passed to sendPollRequest in createHttpPoller.
 *
 * @param settings - The settings of the poll request, including client, options and the spec
 * @returns A callback that accept the path as input and return the promise of Lro response.
 */
export declare function createSendPollRequest<TOptions extends OperationOptions, TClient extends ServiceClient>(settings: {
    client: TClient;
    options: TOptions;
    spec: OperationSpec;
}): (path: string) => Promise<LroResponse<unknown>>;
//# sourceMappingURL=lro.d.ts.map