// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { Room, RoomParticipant } from "./models";
import { CommunicationUserIdentifier, SerializedCommunicationIdentifier } from "@azure/communication-common"
import { 
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier,
  getIdentifierKind
} from "@azure/communication-common";


/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (
  roomParticipant: RoomParticipant
): RestModel.RoomParticipant => {
  const { id, ...rest } = roomParticipant;
  if (getIdentifierKind(id).kind != "communicationUser") {
    throwException("We currently only support CommunicationUsers");
  }
  return {
    communicationIdentifier: serializeCommunicationIdentifier(id),
    ...rest
  };
}

/**
 * Mapping CommunicationUserIdentifier to room participant REST model.
 */
export const mapCommunicationIdentifierToRoomParticipantRestModel = (
  communicationIdentifier: CommunicationUserIdentifier
): RestModel.RoomParticipant => {
  return {
    communicationIdentifier:serializeCommunicationIdentifier(communicationIdentifier)
  }
}


/**
 * @internal
 * Mapping room participant REST model to room participant SDK model.
 */
export const mapToRoomParticipantSdkModel = (
  roomParticipant: RestModel.RoomParticipant
): RoomParticipant => {
  const {communicationIdentifier, ...rest } = roomParticipant;
  return {
    id: deserializeCommunicationIdentifier(
      communicationIdentifier as SerializedCommunicationIdentifier),
    ...rest
  };
}

/**
 * @internal
 * Mapping room REST model to room SDK model.
 */
export const mapToRoomSdkModel = (
  result: RestModel.RoomModel
): Room => {
  const { id, participants, roomJoinPolicy, ...rest } = result;
  return {
    id: id ?? throwException("Room ID cannot be null."),
    participants: participants?.map((participant) =>
      mapToRoomParticipantSdkModel(participant)
    ),
    joinPolicy: roomJoinPolicy,
    ...rest,
  };
};

function throwException(errorMessage: string): never {
  throw new Error(errorMessage);
}
