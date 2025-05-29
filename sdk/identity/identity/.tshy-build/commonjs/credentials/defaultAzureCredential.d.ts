import type { DefaultAzureCredentialClientIdOptions, DefaultAzureCredentialOptions, DefaultAzureCredentialResourceIdOptions } from "./defaultAzureCredentialOptions.js";
import { ChainedTokenCredential } from "./chainedTokenCredential.js";
import type { TokenCredential } from "@azure/core-auth";
/**
 * Creates a {@link ManagedIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
export declare function createDefaultManagedIdentityCredential(options?: DefaultAzureCredentialOptions | DefaultAzureCredentialResourceIdOptions | DefaultAzureCredentialClientIdOptions): TokenCredential;
/**
 * Creates an {@link EnvironmentCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
export declare function createEnvironmentCredential(options?: DefaultAzureCredentialOptions): TokenCredential;
/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */
export declare class UnavailableDefaultCredential implements TokenCredential {
    credentialUnavailableErrorMessage: string;
    credentialName: string;
    constructor(credentialName: string, message: string);
    getToken(): Promise<null>;
}
/**
 * Provides a default {@link ChainedTokenCredential} configuration that works for most
 * applications that use Azure SDK client libraries. For more information, see
 * [DefaultAzureCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#use-defaultazurecredential-for-flexibility).
 *
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link WorkloadIdentityCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 * - {@link AzurePowerShellCredential}
 * - {@link AzureDeveloperCliCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export declare class DefaultAzureCredential extends ChainedTokenCredential {
    /**
     * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialClientIdOptions}.
     *
     * @param options - Optional parameters. See {@link DefaultAzureCredentialClientIdOptions}.
     */
    constructor(options?: DefaultAzureCredentialClientIdOptions);
    /**
     * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialResourceIdOptions}.
     *
     * @param options - Optional parameters. See {@link DefaultAzureCredentialResourceIdOptions}.
     */
    constructor(options?: DefaultAzureCredentialResourceIdOptions);
    /**
     * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialOptions}.
     *
     * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
     */
    constructor(options?: DefaultAzureCredentialOptions);
}
//# sourceMappingURL=defaultAzureCredential.d.ts.map