import { SipRouting } from "../operationsInterfaces/index.js";
import { SipRoutingClientContext } from "../sipRoutingClientContext.js";
import { SipRoutingGetOptionalParams, SipRoutingGetResponse, SipRoutingUpdateOptionalParams, SipRoutingUpdateResponse } from "../models/index.js";
/** Class containing SipRouting operations. */
export declare class SipRoutingImpl implements SipRouting {
    private readonly client;
    /**
     * Initialize a new instance of the class SipRouting class.
     * @param client Reference to the service client
     */
    constructor(client: SipRoutingClientContext);
    /**
     * Gets SIP configuration for resource.
     * @param options The options parameters.
     */
    get(options?: SipRoutingGetOptionalParams): Promise<SipRoutingGetResponse>;
    /**
     * Updates SIP configuration for resource.
     * @param options The options parameters.
     */
    update(options?: SipRoutingUpdateOptionalParams): Promise<SipRoutingUpdateResponse>;
}
//# sourceMappingURL=sipRouting.d.ts.map