import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationGatewayWafDynamicManifests } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ApplicationGatewayWafDynamicManifestResult, ApplicationGatewayWafDynamicManifestsGetOptionalParams } from "../models/index.js";
/** Class containing ApplicationGatewayWafDynamicManifests operations. */
export declare class ApplicationGatewayWafDynamicManifestsImpl implements ApplicationGatewayWafDynamicManifests {
    private readonly client;
    /**
     * Initialize a new instance of the class ApplicationGatewayWafDynamicManifests class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets the regional application gateway waf manifest.
     * @param location The region where the nrp are located at.
     * @param options The options parameters.
     */
    list(location: string, options?: ApplicationGatewayWafDynamicManifestsGetOptionalParams): PagedAsyncIterableIterator<ApplicationGatewayWafDynamicManifestResult>;
    private getPagingPage;
    private getPagingAll;
    /**
     * Gets the regional application gateway waf manifest.
     * @param location The region where the nrp are located at.
     * @param options The options parameters.
     */
    private _get;
    /**
     * GetNext
     * @param location The region where the nrp are located at.
     * @param nextLink The nextLink from the previous successful call to the Get method.
     * @param options The options parameters.
     */
    private _getNext;
}
//# sourceMappingURL=applicationGatewayWafDynamicManifests.d.ts.map