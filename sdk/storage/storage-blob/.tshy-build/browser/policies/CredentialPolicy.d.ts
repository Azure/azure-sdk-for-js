import { BaseRequestPolicy } from "./RequestPolicy.js";
import type { WebResourceLike as WebResource, CompatResponse as HttpOperationResponse } from "@azure/core-http-compat";
/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 */
export declare abstract class CredentialPolicy extends BaseRequestPolicy {
    /**
     * Sends out request.
     *
     * @param request -
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
    /**
     * Child classes must implement this method with request signing. This method
     * will be executed in {@link sendRequest}.
     *
     * @param request -
     */
    protected signRequest(request: WebResource): WebResource;
}
//# sourceMappingURL=CredentialPolicy.d.ts.map