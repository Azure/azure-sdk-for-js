import * as coreClient from "@azure/core-client";
import type * as coreAuth from "@azure/core-auth";
import type { SparkBatch, SparkSessionOperations } from "./operationsInterfaces/index.js";
import type { SparkClientOptionalParams } from "./models/index.js";
/**
 * Represents the Synapse Spark client operations.
 */
export declare class SparkClient extends coreClient.ServiceClient {
    endpoint: string;
    livyApiVersion: string;
    sparkPoolName: string;
    /**
     * Initializes a new instance of the SparkClient class.
     * @param credentials - Subscription credentials which uniquely identify client subscription.
     * @param endpoint - The workspace development endpoint, for example
     *                 https://myworkspace.dev.azuresynapse.net.
     * @param sparkPoolName - Name of the spark pool.
     * @param options - The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, endpoint: string, sparkPoolName: string, options?: SparkClientOptionalParams);
    sparkBatch: SparkBatch;
    sparkSessionOperations: SparkSessionOperations;
}
//# sourceMappingURL=sparkClient.d.ts.map