// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";
import { Role, RoomModel } from "../generated/src";

/** The meeting room. */
export type CommunicationRoom = RoomModel;

/** The participant's role in the room */
export type ParticipantRole = Role;

/** A participant invited to the room. */
export interface InvitedRoomParticipant {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set.  */
  id: CommunicationIdentifier;
  /** Role name. */
  role?: ParticipantRole;
}

export {
  Role,
  RoomModel,
  RoomParticipant
} from "../generated/src";
