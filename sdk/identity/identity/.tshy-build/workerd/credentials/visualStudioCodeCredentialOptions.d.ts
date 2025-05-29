import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";
/**
 * Provides options to configure the Visual Studio Code credential.
 *
 * @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
 * relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
 * {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
 * local development needs. See Azure Account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964).
 */
export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
    /**
     * Optionally pass in a Tenant ID to be used as part of the credential
     */
    tenantId?: string;
}
//# sourceMappingURL=visualStudioCodeCredentialOptions.d.ts.map