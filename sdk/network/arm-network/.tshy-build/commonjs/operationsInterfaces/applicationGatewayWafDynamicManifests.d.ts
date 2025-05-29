import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationGatewayWafDynamicManifestResult, ApplicationGatewayWafDynamicManifestsGetOptionalParams } from "../models/index.js";
/** Interface representing a ApplicationGatewayWafDynamicManifests. */
export interface ApplicationGatewayWafDynamicManifests {
    /**
     * Gets the regional application gateway waf manifest.
     * @param location The region where the nrp are located at.
     * @param options The options parameters.
     */
    list(location: string, options?: ApplicationGatewayWafDynamicManifestsGetOptionalParams): PagedAsyncIterableIterator<ApplicationGatewayWafDynamicManifestResult>;
}
//# sourceMappingURL=applicationGatewayWafDynamicManifests.d.ts.map