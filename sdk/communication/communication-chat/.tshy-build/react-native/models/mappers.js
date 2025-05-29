// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { deserializeCommunicationIdentifier, serializeCommunicationIdentifier, } from "@azure/communication-common";
export const mapToCreateChatThreadOptionsRestModel = (options) => {
    const { participants, idempotencyToken } = options, rest = __rest(options, ["participants", "idempotencyToken"]);
    return Object.assign({ repeatabilityRequestId: idempotencyToken }, rest);
};
/**
 * @internal
 * Mapping chat participant customer model to chat participant REST model
 */
export const mapToChatParticipantRestModel = (chatParticipant) => {
    const { id } = chatParticipant, rest = __rest(chatParticipant, ["id"]);
    return Object.assign(Object.assign({}, rest), { communicationIdentifier: serializeCommunicationIdentifier(id) });
};
/**
 * @internal
 * Mapping add participants request to add chat participants request REST model
 */
export const mapToAddChatParticipantsRequestRestModel = (addParticipantsRequest) => {
    var _a;
    return {
        participants: (_a = addParticipantsRequest.participants) === null || _a === void 0 ? void 0 : _a.map((participant) => mapToChatParticipantRestModel(participant)),
    };
};
/**
 * @internal
 * Mapping chat participant REST model to chat participant SDK model
 */
export const mapToChatParticipantSdkModel = (chatParticipant) => {
    const { communicationIdentifier } = chatParticipant, rest = __rest(chatParticipant, ["communicationIdentifier"]);
    return Object.assign(Object.assign({}, rest), { id: deserializeCommunicationIdentifier(communicationIdentifier) });
};
/**
 * @internal
 */
export const mapToChatContentSdkModel = (content) => {
    const { participants, initiatorCommunicationIdentifier } = content, otherChatContents = __rest(content, ["participants", "initiatorCommunicationIdentifier"]);
    let result = Object.assign({}, otherChatContents);
    if (initiatorCommunicationIdentifier) {
        const initiator = deserializeCommunicationIdentifier(initiatorCommunicationIdentifier);
        result = Object.assign(Object.assign({}, result), { initiator });
    }
    if (participants) {
        result = Object.assign(Object.assign({}, result), { participants: participants === null || participants === void 0 ? void 0 : participants.map((participant) => mapToChatParticipantSdkModel(participant)) });
    }
    return result;
};
/**
 * @internal
 * Mapping chat message REST model to chat message SDK model
 */
export const mapToChatMessageSdkModel = (chatMessage) => {
    const { content, senderCommunicationIdentifier } = chatMessage, otherChatMessage = __rest(chatMessage, ["content", "senderCommunicationIdentifier"]);
    let result = Object.assign({}, otherChatMessage);
    if (content) {
        result = Object.assign(Object.assign({}, result), { content: mapToChatContentSdkModel(content) });
    }
    if (senderCommunicationIdentifier) {
        const sender = deserializeCommunicationIdentifier(senderCommunicationIdentifier);
        result = Object.assign(Object.assign({}, result), { sender });
    }
    return result;
};
/**
 * @internal
 * Mapping chat messages collection REST model to chat message SDK model array
 */
export const mapToChatMessagesSdkModelArray = (chatMessagesCollection) => {
    var _a;
    return (_a = chatMessagesCollection.value) === null || _a === void 0 ? void 0 : _a.map((chatMessage) => mapToChatMessageSdkModel(chatMessage));
};
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToChatThreadPropertiesSdkModel = (chatThread) => {
    const { createdByCommunicationIdentifier } = chatThread, rest = __rest(chatThread, ["createdByCommunicationIdentifier"]);
    if (createdByCommunicationIdentifier) {
        return Object.assign(Object.assign({}, rest), { createdBy: deserializeCommunicationIdentifier(createdByCommunicationIdentifier) });
    }
    else {
        return Object.assign({}, rest);
    }
};
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToCreateChatThreadResultSdkModel = (result) => {
    const { chatThread } = result, rest = __rest(result, ["chatThread"]);
    if (chatThread) {
        return Object.assign(Object.assign({}, rest), { chatThread: mapToChatThreadPropertiesSdkModel(chatThread) });
    }
    else {
        return Object.assign({}, rest);
    }
};
/**
 * @internal
 * Mapping read receipt REST model to read receipt SDK model
 */
export const mapToReadReceiptSdkModel = (readReceipt) => {
    const { senderCommunicationIdentifier } = readReceipt, rest = __rest(readReceipt, ["senderCommunicationIdentifier"]);
    return Object.assign(Object.assign({}, rest), { sender: deserializeCommunicationIdentifier(senderCommunicationIdentifier) });
};
//# sourceMappingURL=mappers.js.map