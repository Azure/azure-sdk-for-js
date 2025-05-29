import type { SendMessageRequest, OptOutRequest } from "../generated/src/models/index.js";
import type { SmsSendOptions, SmsSendRequest } from "../smsClient.js";
export declare function generateSendMessageRequest(smsRequest: SmsSendRequest, options?: SmsSendOptions): SendMessageRequest;
export declare function generateOptOutRequest(from: string, to: string[]): OptOutRequest;
//# sourceMappingURL=smsUtils.d.ts.map