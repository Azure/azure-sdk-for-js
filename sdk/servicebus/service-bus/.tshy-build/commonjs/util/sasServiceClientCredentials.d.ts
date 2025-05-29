import type { AccessToken, NamedKeyCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
/**
 * @internal
 */
export declare class SasServiceClientCredentials {
    /**
     * The NamedKeyCredential containing the key name and secret key value.
     */
    private _credential;
    /**
     * A SasTokenProvider provides a method to retrieve an `AccessToken`.
     */
    private _tokenProvider;
    /**
     * Creates a new sasServiceClientCredentials object.
     *
     * @param credential - The NamedKeyCredential containing the key name and secret key value.
     */
    constructor(credential: NamedKeyCredential);
    private _generateSignature;
    /**
     * Signs a request with the Authentication header.
     *
     * @param request - The {@link PipelineRequest} to be signed.
     * @returns The signed request object.
     */
    signRequest(request: PipelineRequest): Promise<PipelineRequest>;
    getToken(audience: string): Promise<AccessToken>;
}
//# sourceMappingURL=sasServiceClientCredentials.d.ts.map