// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RoomJoinPolicy, RoleType } from "../generated/src";
import { CommunicationUserIdentifier } from "@azure/communication-common";

export { RoomJoinPolicy, RoleType } from "../generated/src/models";

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
export class RoomParticipant {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.  */
  communicationIdentifier: CommunicationIdentifierModel;
  /** Role name. */
  role?: RoleType;

  constructor(participant: CommunicationUserIdentifier, role?: RoleType) {
    this.communicationIdentifier = {
      rawId: participant.communicationUserId,
      communicationUser: participant,
    };
    this.role = role;
  }
}

/** Collection of participants who belong to a room. */
export interface ParticipantsCollection {
  participants: RoomParticipant[];
}

/** Identifies a participant in Azure Communication services. */
export interface CommunicationIdentifierModel {
  /** Raw id of the identifier. Optional in requests, required in responses. */
  rawId?: string;
  /** A user that got created with an Azure Communication Services resource. */
  communicationUser?: CommunicationUserIdentifier;
}
