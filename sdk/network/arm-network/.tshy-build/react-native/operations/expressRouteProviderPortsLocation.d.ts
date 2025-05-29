import { ExpressRouteProviderPortsLocation } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ExpressRouteProviderPortsLocationListOptionalParams, ExpressRouteProviderPortsLocationListResponse } from "../models/index.js";
/** Class containing ExpressRouteProviderPortsLocation operations. */
export declare class ExpressRouteProviderPortsLocationImpl implements ExpressRouteProviderPortsLocation {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteProviderPortsLocation class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves all the ExpressRouteProviderPorts in a subscription.
     * @param options The options parameters.
     */
    list(options?: ExpressRouteProviderPortsLocationListOptionalParams): Promise<ExpressRouteProviderPortsLocationListResponse>;
}
//# sourceMappingURL=expressRouteProviderPortsLocation.d.ts.map