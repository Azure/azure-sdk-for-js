"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCommunicationRoomToSDKModel = exports.mapRoomParticipantForRemoval = exports.mapRoomParticipantToRawId = exports.mapToRoomParticipantSDKModel = exports.mapToRoomParticipantRestModel = void 0;
const tslib_1 = require("tslib");
const communication_common_1 = require("@azure/communication-common");
const communication_common_2 = require("@azure/communication-common");
const defaultRole = "Attendee";
/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
const mapToRoomParticipantRestModel = (roomParticipant) => {
    const { id, role } = roomParticipant;
    if ((0, communication_common_1.getIdentifierKind)(id).kind !== "communicationUser") {
        throwException("We currently only support CommunicationUsers");
    }
    return {
        rawId: (0, communication_common_1.getIdentifierRawId)(id),
        role: role || defaultRole,
    };
};
exports.mapToRoomParticipantRestModel = mapToRoomParticipantRestModel;
/**
 * @internal
 * Mapping room participant REST model to room participant customer model
 */
const mapToRoomParticipantSDKModel = (roomParticipant) => {
    const { rawId, role } = roomParticipant;
    return {
        id: (0, communication_common_2.createIdentifierFromRawId)(rawId),
        role: role || defaultRole,
    };
};
exports.mapToRoomParticipantSDKModel = mapToRoomParticipantSDKModel;
/**
 * @internal
 * Mapping room participant role to participants rawId.
 */
const mapRoomParticipantToRawId = (participants) => {
    participants = participants !== null && participants !== void 0 ? participants : [];
    const mappedParticipants = {};
    for (const participant of participants) {
        const mappedParticipant = (0, exports.mapToRoomParticipantRestModel)(participant);
        mappedParticipants[mappedParticipant.rawId] = { role: mappedParticipant.role || defaultRole };
    }
    return mappedParticipants;
};
exports.mapRoomParticipantToRawId = mapRoomParticipantToRawId;
/**
 * @internal
 * Mapping communication identifier for removal.
 */
const mapRoomParticipantForRemoval = (ids) => {
    const mappedParticipants = {};
    for (const id of ids) {
        const rawId = (0, communication_common_1.getIdentifierRawId)(id);
        mappedParticipants[rawId] = null;
    }
    return mappedParticipants;
};
exports.mapRoomParticipantForRemoval = mapRoomParticipantForRemoval;
/**
 * @internal
 * Mapping room rest model to room customer model.
 */
const mapCommunicationRoomToSDKModel = (room) => {
    const { createdAt } = room, rest = tslib_1.__rest(room, ["createdAt"]);
    return Object.assign({ createdOn: createdAt }, rest);
};
exports.mapCommunicationRoomToSDKModel = mapCommunicationRoomToSDKModel;
function throwException(errorMessage) {
    throw new Error(errorMessage);
}
//# sourceMappingURL=mappers.js.map