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
  /** Raw ID representation of the communication identifier. Please refer to the following document for additional information on Raw ID. <br> https://learn.microsoft.com/azure/communication-services/concepts/identifiers?pivots=programming-language-rest#raw-id-representation */
  rawId?: string;
}

export {
  Role,
  RoomModel,
  RoomParticipant
} from "../generated/src";
