import { MetadataConfiguration } from "../operationsInterfaces/index.js";
import { GeneratedClient } from "../generatedClient.js";
import { MetadataConfigurationGetOptionalParams, MetadataConfigurationGetResponse } from "../models/index.js";
/** Class containing MetadataConfiguration operations. */
export declare class MetadataConfigurationImpl implements MetadataConfiguration {
    private readonly client;
    /**
     * Initialize a new instance of the class MetadataConfiguration class.
     * @param client Reference to the service client
     */
    constructor(client: GeneratedClient);
    /**
     * Retrieves metadata about the attestation signing keys in use by the attestation service
     * @param options The options parameters.
     */
    get(options?: MetadataConfigurationGetOptionalParams): Promise<MetadataConfigurationGetResponse>;
}
//# sourceMappingURL=metadataConfiguration.d.ts.map