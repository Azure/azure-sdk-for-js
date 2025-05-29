"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToReadReceiptSdkModel = exports.mapToCreateChatThreadResultSdkModel = exports.mapToChatThreadPropertiesSdkModel = exports.mapToRetentionPolicySdkModel = exports.mapToChatMessagesSdkModelArray = exports.mapToChatMessageSdkModel = exports.mapToChatContentSdkModel = exports.mapToChatParticipantSdkModel = exports.mapToAddChatParticipantsRequestRestModel = exports.mapToChatParticipantRestModel = exports.mapToCreateChatThreadOptionsRestModel = void 0;
const tslib_1 = require("tslib");
const communication_common_1 = require("@azure/communication-common");
const mapToCreateChatThreadOptionsRestModel = (options) => {
    const { participants, idempotencyToken } = options, rest = tslib_1.__rest(options, ["participants", "idempotencyToken"]);
    return Object.assign({ repeatabilityRequestId: idempotencyToken }, rest);
};
exports.mapToCreateChatThreadOptionsRestModel = mapToCreateChatThreadOptionsRestModel;
/**
 * @internal
 * Mapping chat participant customer model to chat participant REST model
 */
const mapToChatParticipantRestModel = (chatParticipant) => {
    const { id } = chatParticipant, rest = tslib_1.__rest(chatParticipant, ["id"]);
    return Object.assign(Object.assign({}, rest), { communicationIdentifier: (0, communication_common_1.serializeCommunicationIdentifier)(id) });
};
exports.mapToChatParticipantRestModel = mapToChatParticipantRestModel;
/**
 * @internal
 * Mapping add participants request to add chat participants request REST model
 */
const mapToAddChatParticipantsRequestRestModel = (addParticipantsRequest) => {
    var _a;
    return {
        participants: (_a = addParticipantsRequest.participants) === null || _a === void 0 ? void 0 : _a.map((participant) => (0, exports.mapToChatParticipantRestModel)(participant)),
    };
};
exports.mapToAddChatParticipantsRequestRestModel = mapToAddChatParticipantsRequestRestModel;
/**
 * @internal
 * Mapping chat participant REST model to chat participant SDK model
 */
const mapToChatParticipantSdkModel = (chatParticipant) => {
    const { communicationIdentifier } = chatParticipant, rest = tslib_1.__rest(chatParticipant, ["communicationIdentifier"]);
    return Object.assign(Object.assign({}, rest), { id: (0, communication_common_1.deserializeCommunicationIdentifier)(communicationIdentifier) });
};
exports.mapToChatParticipantSdkModel = mapToChatParticipantSdkModel;
/**
 * @internal
 */
const mapToChatContentSdkModel = (content) => {
    const { participants, initiatorCommunicationIdentifier } = content, otherChatContents = tslib_1.__rest(content, ["participants", "initiatorCommunicationIdentifier"]);
    let result = Object.assign({}, otherChatContents);
    if (initiatorCommunicationIdentifier) {
        const initiator = (0, communication_common_1.deserializeCommunicationIdentifier)(initiatorCommunicationIdentifier);
        result = Object.assign(Object.assign({}, result), { initiator });
    }
    if (participants) {
        result = Object.assign(Object.assign({}, result), { participants: participants === null || participants === void 0 ? void 0 : participants.map((participant) => (0, exports.mapToChatParticipantSdkModel)(participant)) });
    }
    return result;
};
exports.mapToChatContentSdkModel = mapToChatContentSdkModel;
/**
 * @internal
 * Mapping chat message REST model to chat message SDK model
 */
const mapToChatMessageSdkModel = (chatMessage) => {
    const { content, senderCommunicationIdentifier } = chatMessage, otherChatMessage = tslib_1.__rest(chatMessage, ["content", "senderCommunicationIdentifier"]);
    let result = Object.assign({}, otherChatMessage);
    if (content) {
        result = Object.assign(Object.assign({}, result), { content: (0, exports.mapToChatContentSdkModel)(content) });
    }
    if (senderCommunicationIdentifier) {
        const sender = (0, communication_common_1.deserializeCommunicationIdentifier)(senderCommunicationIdentifier);
        result = Object.assign(Object.assign({}, result), { sender });
    }
    return result;
};
exports.mapToChatMessageSdkModel = mapToChatMessageSdkModel;
/**
 * @internal
 * Mapping chat messages collection REST model to chat message SDK model array
 */
const mapToChatMessagesSdkModelArray = (chatMessagesCollection) => {
    var _a;
    return (_a = chatMessagesCollection.value) === null || _a === void 0 ? void 0 : _a.map((chatMessage) => (0, exports.mapToChatMessageSdkModel)(chatMessage));
};
exports.mapToChatMessagesSdkModelArray = mapToChatMessagesSdkModelArray;
/**
 * @internal
 * Mapping chat retention policy REST model to chat retention policy SDK model
 */
const mapToRetentionPolicySdkModel = (retentionPolicy) => {
    if (retentionPolicy.kind === "threadCreationDate") {
        return retentionPolicy;
    }
    else {
        throw new Error(`Retention Policy ${retentionPolicy.kind} is not supported`);
    }
};
exports.mapToRetentionPolicySdkModel = mapToRetentionPolicySdkModel;
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
const mapToChatThreadPropertiesSdkModel = (chatThread) => {
    const { createdByCommunicationIdentifier, retentionPolicy } = chatThread, rest = tslib_1.__rest(chatThread, ["createdByCommunicationIdentifier", "retentionPolicy"]);
    let result = Object.assign({}, rest);
    if (createdByCommunicationIdentifier) {
        result = Object.assign(Object.assign({}, result), { createdBy: (0, communication_common_1.deserializeCommunicationIdentifier)(createdByCommunicationIdentifier) });
    }
    if (retentionPolicy) {
        result = Object.assign(Object.assign({}, result), { retentionPolicy: (0, exports.mapToRetentionPolicySdkModel)(retentionPolicy) });
    }
    return result;
};
exports.mapToChatThreadPropertiesSdkModel = mapToChatThreadPropertiesSdkModel;
/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
const mapToCreateChatThreadResultSdkModel = (result) => {
    const { chatThread } = result, rest = tslib_1.__rest(result, ["chatThread"]);
    if (chatThread) {
        return Object.assign(Object.assign({}, rest), { chatThread: (0, exports.mapToChatThreadPropertiesSdkModel)(chatThread) });
    }
    else {
        return Object.assign({}, rest);
    }
};
exports.mapToCreateChatThreadResultSdkModel = mapToCreateChatThreadResultSdkModel;
/**
 * @internal
 * Mapping read receipt REST model to read receipt SDK model
 */
const mapToReadReceiptSdkModel = (readReceipt) => {
    const { senderCommunicationIdentifier } = readReceipt, rest = tslib_1.__rest(readReceipt, ["senderCommunicationIdentifier"]);
    return Object.assign(Object.assign({}, rest), { sender: (0, communication_common_1.deserializeCommunicationIdentifier)(senderCommunicationIdentifier) });
};
exports.mapToReadReceiptSdkModel = mapToReadReceiptSdkModel;
//# sourceMappingURL=mappers.js.map