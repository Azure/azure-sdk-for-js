import type { ServiceClientOptions } from "@azure/core-client";
import { ServiceClient } from "@azure/core-client";
interface IoTModelsRepositoryServiceClientOptions extends ServiceClientOptions {
    version?: string;
    endpoint?: string;
}
/**
 * @internal
 */
export declare class IoTModelsRepositoryServiceClient extends ServiceClient {
    url: string;
    version: string;
    /**
     * Initializes a new instance of the IoTModelsRepositoryServiceClient class.
     *
     * @param url - The URL of the service account or table that is the target of the desired operation.
     * @param options - The parameter options
     */
    constructor(url: string, options?: IoTModelsRepositoryServiceClientOptions);
}
export {};
//# sourceMappingURL=modelsRepositoryServiceClient.d.ts.map