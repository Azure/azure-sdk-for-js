// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

export interface RoomModel {
  id: string;
  createdDateTime?: Date;
  validFrom?: Date;
  validUntil?: Date;
  roomJoinPolicy?: RoomJoinPolicy;
  participants?: RoomParticipant[];
}

export interface RoomParticipant {
  id: CommunicationIdentifier;
  role?: Role;
}

export interface ParticipantsCollection {
  participants: RoomParticipant[];
}

export type RoomJoinPolicy = string;

export type Role = string;
