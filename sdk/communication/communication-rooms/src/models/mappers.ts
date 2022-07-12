// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { RoomModel, RoomParticipant } from "./models";
import { 
  SerializedCommunicationIdentifier,
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier, 
  CommunicationIdentifier
} from "@azure/communication-common"

/**
 * @internal
 * Checks whether the type of a value is RoomParticipant or not.
 * @param participant - The value being checked.
 */
function isRoomParticipant (participant: RoomParticipant | CommunicationIdentifier): participant is RoomParticipant {
  return (<RoomParticipant>participant).role !== undefined;
}

/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (
  roomParticipant: RoomParticipant | CommunicationIdentifier
): RestModel.RoomParticipant => {
  if (isRoomParticipant(roomParticipant)) {
    const { id, ...rest } = roomParticipant;
    return {
      ...rest,
      communicationIdentifier: serializeCommunicationIdentifier(id),
    };
  }
  else {
    return {
      communicationIdentifier: serializeCommunicationIdentifier(roomParticipant),
    };
  }
};

/**
 * @internal
 * Mapping room participant REST model to room participant SDK model.
 */
export const mapToRoomParticipantSdkModel = (
  roomParticipant: RestModel.RoomParticipant
): RoomParticipant => {
  const { communicationIdentifier, ...rest } = roomParticipant;
  return {
    ...rest,
    id: deserializeCommunicationIdentifier(
      communicationIdentifier as SerializedCommunicationIdentifier
    )
  }
}

/**
 * @internal
 * Mapping room REST model to room SDK model.
 */
export const mapToRoomSdkModel = (
  result: RestModel.RoomModel
): RoomModel => {
  const { id, participants, ...rest } = result;
  return {
    id: id ?? throwException("Room ID cannot be null."),
    participants: participants?.map((participant) =>
      mapToRoomParticipantSdkModel(participant)
    ),
    ...rest,
  };
};

function throwException(errorMessage: string): never {
  throw new Error(errorMessage);
}
