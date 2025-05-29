import * as coreClient from "@azure/core-client";
import type * as coreAuth from "@azure/core-auth";
import type { Monitoring } from "./operationsInterfaces/index.js";
import type { MonitoringClientOptionalParams } from "./models/index.js";
export declare class MonitoringClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the MonitoringClient class.
     * @param credentials - Subscription credentials which uniquely identify client subscription.
     * @param endpoint - The workspace development endpoint, for example
     *                 https://myworkspace.dev.azuresynapse.net.
     * @param options - The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, endpoint: string, options?: MonitoringClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    monitoring: Monitoring;
}
//# sourceMappingURL=monitoringClient.d.ts.map