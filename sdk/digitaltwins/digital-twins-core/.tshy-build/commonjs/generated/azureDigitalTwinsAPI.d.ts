import * as coreClient from "@azure/core-client";
import { DigitalTwinModels, Query, DigitalTwins, EventRoutes, ImportJobs, DeleteJobs } from "./operationsInterfaces/index.js";
import { AzureDigitalTwinsAPIOptionalParams } from "./models/index.js";
export declare class AzureDigitalTwinsAPI extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    operationId?: string;
    timeoutInMinutes?: number;
    /**
     * Initializes a new instance of the AzureDigitalTwinsAPI class.
     * @param options The parameter options
     */
    constructor(options?: AzureDigitalTwinsAPIOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    digitalTwinModels: DigitalTwinModels;
    query: Query;
    digitalTwins: DigitalTwins;
    eventRoutes: EventRoutes;
    importJobs: ImportJobs;
    deleteJobs: DeleteJobs;
}
//# sourceMappingURL=azureDigitalTwinsAPI.d.ts.map