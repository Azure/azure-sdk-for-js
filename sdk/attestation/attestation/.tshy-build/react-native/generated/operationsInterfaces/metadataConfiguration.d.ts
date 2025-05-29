import { MetadataConfigurationGetOptionalParams, MetadataConfigurationGetResponse } from "../models/index.js";
/** Interface representing a MetadataConfiguration. */
export interface MetadataConfiguration {
    /**
     * Retrieves metadata about the attestation signing keys in use by the attestation service
     * @param options The options parameters.
     */
    get(options?: MetadataConfigurationGetOptionalParams): Promise<MetadataConfigurationGetResponse>;
}
//# sourceMappingURL=metadataConfiguration.d.ts.map