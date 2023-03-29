// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { Room } from "./models";
import {
  CommunicationUserIdentifier,
  SerializedCommunicationIdentifier,
} from "@azure/communication-common";
import {
  deserializeCommunicationIdentifier,
  getIdentifierKind,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import { ParticipantProperties, RoomParticipant } from "../generated/src/models";

/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
// export const mapToRoomParticipantRestModel = (
//   roomParticipant: RoomParticipant
// ): RestModel.RoomParticipant => {
//   const { id, ...rest } = roomParticipant;
//   if (getIdentifierKind(id).kind !== "communicationUser") {
//     throwException("We currently only support CommunicationUsers");
//   }
//   return {
//     communicationIdentifier: serializeCommunicationIdentifier(id),
//     ...rest,
//   };
// };

/**
 * Mapping CommunicationUserIdentifier to room participant REST model.
 */
// export const mapCommunicationIdentifierToRoomParticipantRestModel = (
//   communicationIdentifier: CommunicationUserIdentifier
// ): RestModel.RoomParticipant => {
//   return {
//     communicationIdentifier: serializeCommunicationIdentifier(communicationIdentifier),
//   };
// };

/**
 * @internal
 * Mapping room participant REST model to room participant SDK model.
 */
// export const mapToRoomParticipantSdkModel = (
//   roomParticipant: RestModel.RoomParticipant
// ): RoomParticipant => {
//   const { communicationIdentifier, ...rest } = roomParticipant;
//   return {
//     id: deserializeCommunicationIdentifier(
//       communicationIdentifier as SerializedCommunicationIdentifier
//     ),
//     ...rest,
//   };
// };

/**
 * @internal
 * Mapping room REST model to room SDK model.
 */
// export const mapToRoomSdkModel = (result: RestModel.RoomModel): Room => {
//   const { id, createdDateTime, participants, roomJoinPolicy, ...rest } = result;
//   return {
//     id: id ?? throwException("Room ID cannot be null."),
//     createdOn: createdDateTime,
//     participants: participants?.map((participant) => mapToRoomParticipantSdkModel(participant)),
//     joinPolicy: roomJoinPolicy,
//     ...rest,
//   };
// };

export const mapRoomParticipantToRawId = (participants?: RoomParticipant[]): Record<string, ParticipantProperties> => {
  participants = participants ?? [];
  const mappedParticipants: Record<string, RestModel.ParticipantProperties>  = {};
  for (var participant of participants) {
    mappedParticipants[participant.rawId] = { role: participant.role };
  }

  return mappedParticipants;
}

export const mapRoomParticipantToRawIdForRemoval = (participants?: RoomParticipant[]): Record<string, ParticipantProperties> => {
  participants = participants ?? [];
  const mappedParticipants: Record<string, any>  = {};
  for (var participant of participants) {
    mappedParticipants[participant.rawId] = null;
  }

  return mappedParticipants;
}

function throwException(errorMessage: string): never {
  throw new Error(errorMessage);
}
