import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, WebServices } from "./operationsInterfaces/index.js";
import { AzureMLWebServicesManagementClientOptionalParams } from "./models/index.js";
export declare class AzureMLWebServicesManagementClient extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the AzureMLWebServicesManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The Azure subscription ID.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: AzureMLWebServicesManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    webServices: WebServices;
}
//# sourceMappingURL=azureMLWebServicesManagementClient.d.ts.map