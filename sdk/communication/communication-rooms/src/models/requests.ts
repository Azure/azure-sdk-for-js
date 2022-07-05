// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RoomParticipant, RoomJoinPolicy } from "./models";
import { CommunicationIdentifier } from "@azure/communication-common"

/** Request payload for creating a room. */
export interface CreateRoomRequest {
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
  /** The room join policy for the room. */
  roomJoinPolicy?: RoomJoinPolicy;
  /** Collection of participants invited to the room. */
  participants?: RoomParticipant[];
}

/** Request payload for updating a room. */
export interface PatchRoomRequest {
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
  /** The room join policy for the room. */
  roomJoinPolicy?: RoomJoinPolicy;
  /** Collection of participants invited to the room. */
  participants?: RoomParticipant[];
}

/** Request payload for adding participants to a room. */
export interface AddParticipantsRequest {
  /** Collection of participants being added to the room. */
  participants: RoomParticipant[];
}

/** Request payload for updating participants in a room. */
export interface UpdateParticipantsRequest {
  /** Collection of participants being updated in a room. */
  participants: RoomParticipant[];
}

/** Request payload for removing participants from a room. */
export interface RemoveParticipantsRequest {
  /** Collection of participants being removed from a room. */
  participants: (RoomParticipant | CommunicationIdentifier)[];
}
