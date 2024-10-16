// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as RestModel from "../generated/src/models";
import {
  CommunicationRoom,
  ParticipantRole,
  RoomParticipant,
  RoomParticipantPatch,
} from "./models";
import {
  CommunicationIdentifier,
  getIdentifierKind,
  getIdentifierRawId,
} from "@azure/communication-common";
import {
  ParticipantProperties,
  RoomParticipant as RESTRoomParticipant,
} from "../generated/src/models";
import { createIdentifierFromRawId } from "@azure/communication-common";

const defaultRole: ParticipantRole = "Attendee";

/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (
  roomParticipant: RoomParticipantPatch,
): RESTRoomParticipant => {
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
export const mapToRoomParticipantSDKModel = (
  roomParticipant: RESTRoomParticipant,
): RoomParticipant => {
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
export const mapRoomParticipantToRawId = (
  participants?: RoomParticipantPatch[],
): Record<string, ParticipantProperties> => {
  participants = participants ?? [];
  const mappedParticipants: Record<string, RestModel.ParticipantProperties> = {};
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
export const mapRoomParticipantForRemoval = (
  ids: CommunicationIdentifier[],
): Record<string, ParticipantProperties> => {
  const mappedParticipants: Record<string, any> = {};
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
export const mapCommunicationRoomToSDKModel = (room: RestModel.RoomModel): CommunicationRoom => {
  const { createdAt, ...rest } = room;
  return {
    createdOn: createdAt,
    ...rest,
  };
};

function throwException(errorMessage: string): never {
  throw new Error(errorMessage);
}
