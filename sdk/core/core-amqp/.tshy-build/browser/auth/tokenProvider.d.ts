import type { AccessToken, NamedKeyCredential, SASCredential } from "@azure/core-auth";
/**
 * A SasTokenProvider provides an alternative to TokenCredential for providing an `AccessToken`.
 * @hidden
 */
export interface SasTokenProvider {
    /**
     * Property used to distinguish SasTokenProvider from TokenCredential.
     */
    isSasTokenProvider: true;
    /**
     * Gets the token provided by this provider.
     *
     * This method is called automatically by Azure SDK client libraries.
     *
     * @param audience - The audience for which the token is desired.
     */
    getToken(audience: string): Promise<AccessToken>;
}
/**
 * Creates a token provider from the provided shared access data.
 * @param data - The sharedAccessKeyName/sharedAccessKey pair or the sharedAccessSignature.
 * @hidden
 */
export declare function createSasTokenProvider(data: {
    sharedAccessKeyName: string;
    sharedAccessKey: string;
} | {
    sharedAccessSignature: string;
} | NamedKeyCredential | SASCredential): SasTokenProvider;
/**
 * A TokenProvider that generates a Sas token:
 * `SharedAccessSignature sr=<resource>&sig=<signature>&se=<expiry>&skn=<keyname>`
 *
 * @internal
 */
export declare class SasTokenProviderImpl implements SasTokenProvider {
    /**
     * Property used to distinguish TokenProvider from TokenCredential.
     */
    get isSasTokenProvider(): true;
    /**
     * The SASCredential containing the key name and secret key value.
     */
    private _credential;
    /**
     * Initializes a new instance of SasTokenProvider
     * @param credential - The source `NamedKeyCredential` or `SASCredential`.
     */
    constructor(credential: SASCredential | NamedKeyCredential);
    /**
     * Gets the sas token for the specified audience
     * @param audience - The audience for which the token is desired.
     */
    getToken(audience: string): Promise<AccessToken>;
}
//# sourceMappingURL=tokenProvider.d.ts.map