import { SendMessageRequest, SmsSendOptionalParams, SmsSendOperationResponse } from "../models/index.js";
/** Interface representing a Sms. */
export interface Sms {
    /**
     * Sends a SMS message from a phone number that belongs to the authenticated account.
     * @param sendMessageRequest Represents the body of the send message request.
     * @param options The options parameters.
     */
    send(sendMessageRequest: SendMessageRequest, options?: SmsSendOptionalParams): Promise<SmsSendOperationResponse>;
}
//# sourceMappingURL=sms.d.ts.map