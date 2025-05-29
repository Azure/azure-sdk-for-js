import { SipRouting } from "./operationsInterfaces/index.js";
import { SipRoutingClientContext } from "./sipRoutingClientContext.js";
import { SipRoutingClientOptionalParams } from "./models/index.js";
export declare class SipRoutingClient extends SipRoutingClientContext {
    /**
     * Initializes a new instance of the SipRoutingClient class.
     * @param endpoint The communication resource, for example https://resourcename.communication.azure.com
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: SipRoutingClientOptionalParams);
    sipRouting: SipRouting;
}
//# sourceMappingURL=sipRoutingClient.d.ts.map