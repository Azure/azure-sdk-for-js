import type { IntegrationRuntimes } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { IntegrationRuntimesListOptionalParams, IntegrationRuntimesListResponse, IntegrationRuntimesGetOptionalParams, IntegrationRuntimesGetResponse } from "../models/index.js";
/** Class containing IntegrationRuntimes operations. */
export declare class IntegrationRuntimesImpl implements IntegrationRuntimes {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationRuntimes class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * List Integration Runtimes
     * @param options - The options parameters.
     */
    list(options?: IntegrationRuntimesListOptionalParams): Promise<IntegrationRuntimesListResponse>;
    /**
     * Get Integration Runtime
     * @param integrationRuntimeName - The Integration Runtime name
     * @param options - The options parameters.
     */
    get(integrationRuntimeName: string, options?: IntegrationRuntimesGetOptionalParams): Promise<IntegrationRuntimesGetResponse>;
}
//# sourceMappingURL=integrationRuntimes.d.ts.map