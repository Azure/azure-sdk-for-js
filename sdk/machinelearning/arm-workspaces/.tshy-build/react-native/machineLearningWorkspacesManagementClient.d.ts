import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, Workspaces } from "./operationsInterfaces/index.js";
import { MachineLearningWorkspacesManagementClientOptionalParams } from "./models/index.js";
export declare class MachineLearningWorkspacesManagementClient extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the MachineLearningWorkspacesManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The Microsoft Azure subscription ID.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: MachineLearningWorkspacesManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    workspaces: Workspaces;
}
//# sourceMappingURL=machineLearningWorkspacesManagementClient.d.ts.map