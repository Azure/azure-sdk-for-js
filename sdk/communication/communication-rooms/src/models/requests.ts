// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RoomParticipant } from "./models";
import { CommunicationIdentifier } from "@azure/communication-common"

export interface CreateRoomRequest {
  validFrom?: Date;
  validUntil?: Date;
  roomJoinPolicy?: string;
  participants?: RoomParticipant[];
}

export interface PatchRoomRequest {
  validFrom?: Date;
  validUntil?: Date;
  roomJoinPolicy?: string;
  participants?: RoomParticipant[];
}

export interface AddParticipantsRequest {
  participants: RoomParticipant[];
}

export interface UpdateParticipantsRequest {
  participants: RoomParticipant[];
}

export interface RemoveParticipantsRequest {
  participants: (RoomParticipant | CommunicationIdentifier)[];
}
