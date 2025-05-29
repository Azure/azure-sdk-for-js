import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions, WebResourceLike as WebResource } from "@azure/core-http-compat";
import type { StorageSharedKeyCredential } from "../credentials/StorageSharedKeyCredential.js";
import { CredentialPolicy } from "./CredentialPolicy.js";
/**
 * StorageSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
export declare class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
    /**
     * Reference to StorageSharedKeyCredential which generates StorageSharedKeyCredentialPolicy
     */
    private readonly factory;
    /**
     * Creates an instance of StorageSharedKeyCredentialPolicy.
     * @param nextPolicy -
     * @param options -
     * @param factory -
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, factory: StorageSharedKeyCredential);
    /**
     * Signs request.
     *
     * @param request -
     */
    protected signRequest(request: WebResource): WebResource;
    /**
     * Retrieve header value according to shared key sign rules.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
     *
     * @param request -
     * @param headerName -
     */
    private getHeaderValueToSign;
    /**
     * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
     * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
     * 2. Convert each HTTP header name to lowercase.
     * 3. Sort the headers lexicographically by header name, in ascending order.
     *    Each header may appear only once in the string.
     * 4. Replace any linear whitespace in the header value with a single space.
     * 5. Trim any whitespace around the colon in the header.
     * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
     *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
     *
     * @param request -
     */
    private getCanonicalizedHeadersString;
    /**
     * Retrieves the webResource canonicalized resource string.
     *
     * @param request -
     */
    private getCanonicalizedResourceString;
}
//# sourceMappingURL=StorageSharedKeyCredentialPolicy.d.ts.map