import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, Accounts, Extensions, Projects } from "./operationsInterfaces/index.js";
import { VisualStudioResourceProviderClientOptionalParams } from "./models/index.js";
export declare class VisualStudioResourceProviderClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the VisualStudioResourceProviderClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The Azure subscription identifier.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: VisualStudioResourceProviderClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    accounts: Accounts;
    extensions: Extensions;
    projects: Projects;
}
//# sourceMappingURL=visualStudioResourceProviderClient.d.ts.map