import { SipRoutingGetOptionalParams, SipRoutingGetResponse, SipRoutingUpdateOptionalParams, SipRoutingUpdateResponse } from "../models/index.js";
/** Interface representing a SipRouting. */
export interface SipRouting {
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