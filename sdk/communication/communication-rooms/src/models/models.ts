// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationIdentifier, CommunicationIdentifierKind } from "@azure/communication-common";

/** The meeting room. */
export interface CommunicationRoom {
  /** Unique identifier of a room. This id is server generated. */
  id: string;
  /** The timestamp when the room was created at the server. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  createdOn: Date;
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil: Date;
  /** Set this flag to true if, at the time of the call, dial out to a PSTN number is enabled in a particular room. By default, this flag is set to false. */
  pstnDialOutEnabled: boolean;
}

/** The participant's role in the room */
export type ParticipantRole = "Presenter" | "Attendee" | "Consumer";

/** A participant of the room. */
export interface RoomParticipant {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.  */
  id: CommunicationIdentifierKind;
  /** Role name. */
  role: ParticipantRole;
}

/** A participant of the room. */
export interface RoomParticipantPatch {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.  */
  id: CommunicationIdentifier;
  /** The role of a room participant. The default value is Attendee. */
  role?: ParticipantRole;
}
