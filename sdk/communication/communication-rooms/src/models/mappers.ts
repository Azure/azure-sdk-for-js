// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { InvitedRoomParticipant } from "./models";
import {
  CommunicationIdentifier,
  getIdentifierKind,
  getIdentifierRawId,
} from "@azure/communication-common";
import { ParticipantProperties, RoomParticipant } from "../generated/src/models";

/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (
  roomParticipant: InvitedRoomParticipant
): RoomParticipant => {
  const { id, role } = roomParticipant;
  if (getIdentifierKind(id).kind !== "communicationUser") {
    throwException("We currently only support CommunicationUsers");
  }
  return {
    rawId: getIdentifierRawId(id),
    role: role || "Attendee",
  };
};

/**
 * @internal
 * Mapping room participant role to participants rawId.
 */
export const mapRoomParticipantToRawId = (
  participants?: InvitedRoomParticipant[]
): Record<string, ParticipantProperties> => {
  participants = participants ?? [];
  const mappedParticipants: Record<string, RestModel.ParticipantProperties> = {};
  for (var participant of participants) {
    var mappedParticipant = mapToRoomParticipantRestModel(participant);
    mappedParticipants[mappedParticipant.rawId] = { role: mappedParticipant.role };
  }

  return mappedParticipants;
};

/**
 * @internal
 * Mapping communication identifier for removal.
 */
export const mapCommunicationIdentifierForRemoval = (
  ids: CommunicationIdentifier[]
): Record<string, ParticipantProperties> => {
  const mappedParticipants: Record<string, any> = {};
  for (const id of ids) {
    const rawId = getIdentifierRawId(id);
    mappedParticipants[rawId] = null;
  }

  return mappedParticipants;
};

function throwException(errorMessage: string): never {
  throw new Error(errorMessage);
}
