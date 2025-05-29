import { MessageIdUpdateOptionalParams, MessageIdUpdateResponse, MessageIdDeleteOptionalParams, MessageIdDeleteResponse } from "../models/index.js";
/** Interface representing a MessageId. */
export interface MessageId {
    /**
     * The Update operation was introduced with version 2011-08-18 of the Queue service API. The Update
     * Message operation updates the visibility timeout of a message. You can also use this operation to
     * update the contents of a message. A message must be in a format that can be included in an XML
     * request with UTF-8 encoding, and the encoded message can be up to 64KB in size.
     * @param popReceipt Required. Specifies the valid pop receipt value returned from an earlier call to
     *                   the Get Messages or Update Message operation.
     * @param visibilityTimeout Optional. Specifies the new visibility timeout value, in seconds, relative
     *                          to server time. The default value is 30 seconds. A specified value must be larger than or equal to 1
     *                          second, and cannot be larger than 7 days, or larger than 2 hours on REST protocol versions prior to
     *                          version 2011-08-18. The visibility timeout of a message can be set to a value later than the expiry
     *                          time.
     * @param options The options parameters.
     */
    update(popReceipt: string, visibilityTimeout: number, options?: MessageIdUpdateOptionalParams): Promise<MessageIdUpdateResponse>;
    /**
     * The Delete operation deletes the specified message.
     * @param popReceipt Required. Specifies the valid pop receipt value returned from an earlier call to
     *                   the Get Messages or Update Message operation.
     * @param options The options parameters.
     */
    delete(popReceipt: string, options?: MessageIdDeleteOptionalParams): Promise<MessageIdDeleteResponse>;
}
//# sourceMappingURL=messageId.d.ts.map