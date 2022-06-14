// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

export interface RoomModel {
  id: string;
  createdDateTime?: Date;
  validFrom?: Date;
  validUntil?: Date;
  participants?: RoomParticipant[];
}

export interface RoomParticipant {
  id: CommunicationIdentifier;
  role?: string;
}

export interface ParticipantsCollection {
  participants: RoomParticipant[];
}