import { OptOuts } from "../operationsInterfaces/index.js";
import { SmsApiClient } from "../smsApiClient.js";
import { OptOutRequest, OptOutsAddOptionalParams, OptOutsAddResponse, OptOutsRemoveOptionalParams, OptOutsRemoveResponse, OptOutsCheckOptionalParams, OptOutsCheckResponse } from "../models/index.js";
/** Class containing OptOuts operations. */
export declare class OptOutsImpl implements OptOuts {
    private readonly client;
    /**
     * Initialize a new instance of the class OptOuts class.
     * @param client Reference to the service client
     */
    constructor(client: SmsApiClient);
    /**
     * Add phone numbers to the optouts list which shall stop receiving messages from a sender number.
     * @param body An opt out request.
     * @param options The options parameters.
     */
    add(body: OptOutRequest, options?: OptOutsAddOptionalParams): Promise<OptOutsAddResponse>;
    /**
     * Remove phone numbers from the optouts list.
     * @param body An opt out request.
     * @param options The options parameters.
     */
    remove(body: OptOutRequest, options?: OptOutsRemoveOptionalParams): Promise<OptOutsRemoveResponse>;
    /**
     * Check the opt out status for a recipient phone number with a sender phone number.
     * @param body An opt out request.
     * @param options The options parameters.
     */
    check(body: OptOutRequest, options?: OptOutsCheckOptionalParams): Promise<OptOutsCheckResponse>;
}
//# sourceMappingURL=optOuts.d.ts.map