import type { AccessToken, TokenCredential } from "@azure/core-auth";
/**
 * Represents a named key credential.
 */
export interface NamedKeyCredential {
    /**
     * The Shared Access Signature key name.
     */
    sharedAccessKeyName: string;
    /**
     * The Shared Access Signature key value.
     */
    sharedAccessKey: string;
}
/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export declare class SasTokenCredential implements TokenCredential {
    /**
     * The SASCredential containing the key name and secret key value.
     */
    private _credential;
    /**
     * Initializes a new instance of SasTokenProvider
     * @param credential - The source `NamedKeyCredential` or `SASCredential`.
     */
    constructor(credential: NamedKeyCredential);
    /**
     * Gets the sas token for the specified audience
     * @param scopes - The scope for which the token is desired.
     */
    getToken(scopes: string | string[]): Promise<AccessToken | null>;
}
//# sourceMappingURL=sasTokenCredential.d.ts.map