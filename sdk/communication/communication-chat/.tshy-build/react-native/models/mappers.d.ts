import type * as RestModel from "../generated/src/models/index.js";
import type { AddParticipantsRequest } from "./requests.js";
import type { CreateChatThreadOptions } from "./options.js";
import type { ChatMessage, ChatMessageContent, ChatMessageReadReceipt, ChatParticipant, ChatThreadProperties, CreateChatThreadResult } from "./models.js";
export declare const mapToCreateChatThreadOptionsRestModel: (options: CreateChatThreadOptions) => RestModel.ChatCreateChatThreadOptionalParams;
/**
 * @internal
 * Mapping chat participant customer model to chat participant REST model
 */
export declare const mapToChatParticipantRestModel: (chatParticipant: ChatParticipant) => RestModel.ChatParticipant;
/**
 * @internal
 * Mapping add participants request to add chat participants request REST model
 */
export declare const mapToAddChatParticipantsRequestRestModel: (addParticipantsRequest: AddParticipantsRequest) => RestModel.AddChatParticipantsRequest;
/**
 * @internal
 * Mapping chat participant REST model to chat participant SDK model
 */
export declare const mapToChatParticipantSdkModel: (chatParticipant: RestModel.ChatParticipant) => ChatParticipant;
/**
 * @internal
 */
export declare const mapToChatContentSdkModel: (content: RestModel.ChatMessageContent) => ChatMessageContent;
/**
 * @internal
 * Mapping chat message REST model to chat message SDK model
 */
export declare const mapToChatMessageSdkModel: (chatMessage: RestModel.ChatMessage) => ChatMessage;
/**
 * @internal
 * Mapping chat messages collection REST model to chat message SDK model array
 */
export declare const mapToChatMessagesSdkModelArray: (chatMessagesCollection: RestModel.ChatMessagesCollection) => ChatMessage[];
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export declare const mapToChatThreadPropertiesSdkModel: (chatThread: RestModel.ChatThreadProperties) => ChatThreadProperties;
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export declare const mapToCreateChatThreadResultSdkModel: (result: RestModel.CreateChatThreadResult) => CreateChatThreadResult;
/**
 * @internal
 * Mapping read receipt REST model to read receipt SDK model
 */
export declare const mapToReadReceiptSdkModel: (readReceipt: RestModel.ChatMessageReadReceipt) => ChatMessageReadReceipt;
//# sourceMappingURL=mappers.d.ts.map