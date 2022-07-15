// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { RoomModel, RoomParticipant } from "./models";
import { CommunicationUserIdentifier } from "@azure/communication-common"


/**
 * @internal
 * Mapping room participant customer model to room participant REST model.
 */
export const mapToRoomParticipantRestModel = (
  roomParticipant: RoomParticipant
): RestModel.RoomParticipant => {
  const { communicationIdentifier, ...rest } = roomParticipant;
  const mri = communicationIdentifier.communicationUser!.communicationUserId;
  return {
    communicationIdentifier: {
      rawId: mri,
      communicationUser: {
        id: mri
      }
    },
    ...rest
  };
}

export const mapCommunicationIdentifierToRoomParticipantRestModel = (
  communicationIdentifier: CommunicationUserIdentifier
): RestModel.RoomParticipant => {
  const mri = communicationIdentifier.communicationUserId;
  return {
    communicationIdentifier: {
      rawId: mri,
      communicationUser: {
        id: mri
      },
    }
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
  const mri = communicationIdentifier.communicationUser!.id;
  return {
    communicationIdentifier: {
      rawId: mri,
      communicationUser: {
        communicationUserId: mri
      }
    },
    ...rest
  };
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
