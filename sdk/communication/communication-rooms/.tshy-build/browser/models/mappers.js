// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { getIdentifierKind, getIdentifierRawId } from "@azure/communication-common";
import { createIdentifierFromRawId } from "@azure/communication-common";
const defaultRole = "Attendee";
/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (roomParticipant) => {
    const { id, role } = roomParticipant;
    if (getIdentifierKind(id).kind !== "communicationUser") {
        throwException("We currently only support CommunicationUsers");
    }
    return {
        rawId: getIdentifierRawId(id),
        role: role || defaultRole,
    };
};
/**
 * @internal
 * Mapping room participant REST model to room participant customer model
 */
export const mapToRoomParticipantSDKModel = (roomParticipant) => {
    const { rawId, role } = roomParticipant;
    return {
        id: createIdentifierFromRawId(rawId),
        role: role || defaultRole,
    };
};
/**
 * @internal
 * Mapping room participant role to participants rawId.
 */
export const mapRoomParticipantToRawId = (participants) => {
    participants = participants !== null && participants !== void 0 ? participants : [];
    const mappedParticipants = {};
    for (const participant of participants) {
        const mappedParticipant = mapToRoomParticipantRestModel(participant);
        mappedParticipants[mappedParticipant.rawId] = { role: mappedParticipant.role || defaultRole };
    }
    return mappedParticipants;
};
/**
 * @internal
 * Mapping communication identifier for removal.
 */
export const mapRoomParticipantForRemoval = (ids) => {
    const mappedParticipants = {};
    for (const id of ids) {
        const rawId = getIdentifierRawId(id);
        mappedParticipants[rawId] = null;
    }
    return mappedParticipants;
};
/**
 * @internal
 * Mapping room rest model to room customer model.
 */
export const mapCommunicationRoomToSDKModel = (room) => {
    const { createdAt } = room, rest = __rest(room, ["createdAt"]);
    return Object.assign({ createdOn: createdAt }, rest);
};
function throwException(errorMessage) {
    throw new Error(errorMessage);
}
//# sourceMappingURL=mappers.js.map