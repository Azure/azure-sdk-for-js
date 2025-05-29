import * as coreClient from "@azure/core-client";
import type * as coreAuth from "@azure/core-auth";
import type { Jobs, Providers, Storage, Quotas } from "./operationsInterfaces/index.js";
import type { QuantumJobClientOptionalParams } from "./models/index.js";
export declare class QuantumJobClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    resourceGroupName: string;
    workspaceName: string;
    /**
     * Initializes a new instance of the QuantumJobClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The Azure subscription ID. This is a GUID-formatted string (e.g.
     *                       00000000-0000-0000-0000-000000000000)
     * @param resourceGroupName Name of an Azure resource group.
     * @param workspaceName Name of the workspace.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, resourceGroupName: string, workspaceName: string, options?: QuantumJobClientOptionalParams);
    jobs: Jobs;
    providers: Providers;
    storage: Storage;
    quotas: Quotas;
}
//# sourceMappingURL=quantumJobClient.d.ts.map