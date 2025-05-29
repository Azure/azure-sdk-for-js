import { Client, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
export interface WeightsAndBiasesContext extends Client {
    /** The API version to use for this operation. */
    /** Known values of {@link KnownVersions} that the service accepts. */
    apiVersion: string;
    /** The ID of the target subscription. The value must be an UUID. */
    subscriptionId: string;
}
/** Optional parameters for the client. */
export interface WeightsAndBiasesClientOptionalParams extends ClientOptions {
    /** The API version to use for this operation. */
    /** Known values of {@link KnownVersions} that the service accepts. */
    apiVersion?: string;
}
export declare function createWeightsAndBiases(credential: TokenCredential, subscriptionId: string, options?: WeightsAndBiasesClientOptionalParams): WeightsAndBiasesContext;
//# sourceMappingURL=weightsAndBiasesContext.d.ts.map