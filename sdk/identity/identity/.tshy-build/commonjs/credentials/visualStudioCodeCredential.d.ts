import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { VisualStudioCodeCredentialOptions } from "./visualStudioCodeCredentialOptions.js";
import type { VSCodeCredentialFinder } from "./visualStudioCodeCredentialPlugin.js";
export declare const vsCodeCredentialControl: {
    setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void;
};
/**
 * Attempts to load a specific property from the VSCode configurations of the current OS.
 * If it fails at any point, returns undefined.
 */
export declare function getPropertyFromVSCode(property: string): string | undefined;
/**
 * Connects to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 *
 * It's a [known issue](https://github.com/Azure/azure-sdk-for-js/issues/20500) that this credential doesn't
 * work with [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)
 * versions newer than **0.9.11**. A long-term fix to this problem is in progress. In the meantime, consider
 * authenticating with {@link AzureCliCredential}.
 *
 * @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
 * relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
 * {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
 * local development needs. See Azure Account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964).
 *
 */
export declare class VisualStudioCodeCredential implements TokenCredential {
    private identityClient;
    private tenantId;
    private additionallyAllowedTenantIds;
    private cloudName;
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
     * `@azure/identity-vscode`. If this package is not installed and registered
     * using the plugin API (`useIdentityPlugin`), then authentication using
     * `VisualStudioCodeCredential` will not be available.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options?: VisualStudioCodeCredentialOptions);
    /**
     * Runs preparations for any further getToken request.
     */
    private prepare;
    /**
     * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
     */
    private preparePromise;
    /**
     * Runs preparations for any further getToken, but only once.
     */
    private prepareOnce;
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
}
//# sourceMappingURL=visualStudioCodeCredential.d.ts.map