// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

/** The meeting room. */
export interface RoomModel {
  /** Unique identifier of a room. This id is server generated. */
  id: string;
  /** The timestamp when the room was created at the server. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  createdDateTime?: Date;
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
  /** The room join policy for the room. */
  roomJoinPolicy?: RoomJoinPolicy;
  /** Collection of identities invited to the room. */
  participants?: RoomParticipant[];
}

/** A participant of the room. */
export interface RoomParticipant {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.  */
  id: CommunicationIdentifier;
  /** Role name. */
  role?: Role;
}

/** Collection of participants who belong to a room. */
export interface ParticipantsCollection {
  participants: RoomParticipant[];
}

/** The room join policy for a room. */
export type RoomJoinPolicy = string;

/** The role name of a participant. */
export type Role = string;
