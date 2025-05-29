import { Client, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
/** Workloads client provides access to various workload operations. */
export interface WorkloadsContext extends Client {
    /** The API version to use for this operation. */
    /** Known values of {@link KnownVersions} that the service accepts. */
    apiVersion: string;
    /** The ID of the target subscription. The value must be an UUID. */
    subscriptionId: string;
}
/** Optional parameters for the client. */
export interface WorkloadsClientOptionalParams extends ClientOptions {
    /** The API version to use for this operation. */
    /** Known values of {@link KnownVersions} that the service accepts. */
    apiVersion?: string;
}
/** Workloads client provides access to various workload operations. */
export declare function createWorkloads(credential: TokenCredential, subscriptionId: string, options?: WorkloadsClientOptionalParams): WorkloadsContext;
//# sourceMappingURL=workloadsContext.d.ts.map