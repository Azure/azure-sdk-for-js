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

function isRoomParticipant (participant: RoomParticipant | CommunicationIdentifier): participant is RoomParticipant {
  return (<RoomParticipant>participant).role !== undefined;
}

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
