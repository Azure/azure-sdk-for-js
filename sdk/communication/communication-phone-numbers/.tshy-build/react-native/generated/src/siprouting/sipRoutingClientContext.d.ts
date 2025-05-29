import * as coreClient from "@azure/core-client";
import { SipRoutingClientOptionalParams } from "./models/index.js";
export declare class SipRoutingClientContext extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the SipRoutingClientContext class.
     * @param endpoint The communication resource, for example https://resourcename.communication.azure.com
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: SipRoutingClientOptionalParams);
}
//# sourceMappingURL=sipRoutingClientContext.d.ts.map