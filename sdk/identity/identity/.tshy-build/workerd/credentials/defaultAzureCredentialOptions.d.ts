import type { AuthorityValidationOptions } from "./authorityValidationOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";
/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 * This variation supports `managedIdentityClientId` and not `managedIdentityResourceId`, since only one of both is supported.
 */
export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
    /**
     * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
     * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
     */
    managedIdentityClientId?: string;
    /**
     * Optionally pass in a user assigned client ID to be used by the {@link WorkloadIdentityCredential}.
     * This client ID can also be passed through to the {@link WorkloadIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
     */
    workloadIdentityClientId?: string;
}
/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 * This variation supports `managedIdentityResourceId` and not `managedIdentityClientId`, since only one of both is supported.
 */
export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
    /**
     * Optionally pass in a resource ID to be used by the {@link ManagedIdentityCredential}.
     * In scenarios such as when user assigned identities are created using an ARM template,
     * where the resource Id of the identity is known but the client Id can't be known ahead of time,
     * this parameter allows programs to use these user assigned identities
     * without having to first determine the client Id of the created identity.
     */
    managedIdentityResourceId: string;
}
/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 */
export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    /**
     * Optionally pass in a Tenant ID to be used as part of the credential.
     * By default it may use a generic tenant ID depending on the underlying credential.
     */
    tenantId?: string;
    /**
     * Timeout configurable for making token requests for developer credentials, namely, {@link AzurePowershellCredential},
     * {@link AzureDeveloperCliCredential} and {@link AzureCliCredential}.
     * Process timeout for credentials should be provided in milliseconds.
     */
    processTimeoutInMs?: number;
}
//# sourceMappingURL=defaultAzureCredentialOptions.d.ts.map