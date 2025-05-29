import { ApplicationGatewayWafDynamicManifestsDefault } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams, ApplicationGatewayWafDynamicManifestsDefaultGetResponse } from "../models/index.js";
/** Class containing ApplicationGatewayWafDynamicManifestsDefault operations. */
export declare class ApplicationGatewayWafDynamicManifestsDefaultImpl implements ApplicationGatewayWafDynamicManifestsDefault {
    private readonly client;
    /**
     * Initialize a new instance of the class ApplicationGatewayWafDynamicManifestsDefault class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets the regional application gateway waf manifest.
     * @param location The region where the nrp are located at.
     * @param options The options parameters.
     */
    get(location: string, options?: ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams): Promise<ApplicationGatewayWafDynamicManifestsDefaultGetResponse>;
}
//# sourceMappingURL=applicationGatewayWafDynamicManifestsDefault.d.ts.map