import { Sms } from "../operationsInterfaces/index.js";
import { SmsApiClient } from "../smsApiClient.js";
import { SendMessageRequest, SmsSendOptionalParams, SmsSendOperationResponse } from "../models/index.js";
/** Class containing Sms operations. */
export declare class SmsImpl implements Sms {
    private readonly client;
    /**
     * Initialize a new instance of the class Sms class.
     * @param client Reference to the service client
     */
    constructor(client: SmsApiClient);
    /**
     * Sends a SMS message from a phone number that belongs to the authenticated account.
     * @param sendMessageRequest Represents the body of the send message request.
     * @param options The options parameters.
     */
    send(sendMessageRequest: SendMessageRequest, options?: SmsSendOptionalParams): Promise<SmsSendOperationResponse>;
}
//# sourceMappingURL=sms.d.ts.map