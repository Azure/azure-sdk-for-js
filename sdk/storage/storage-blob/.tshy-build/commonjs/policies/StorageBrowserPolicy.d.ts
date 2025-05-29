import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions, WebResourceLike as WebResource, CompatResponse as HttpOperationResponse } from "@azure/core-http-compat";
import { BaseRequestPolicy } from "./RequestPolicy.js";
/**
 * StorageBrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * StorageBrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 */
export declare class StorageBrowserPolicy extends BaseRequestPolicy {
    /**
     * Creates an instance of StorageBrowserPolicy.
     * @param nextPolicy -
     * @param options -
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    /**
     * Sends out request.
     *
     * @param request -
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=StorageBrowserPolicy.d.ts.map