// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { CommunicationIdentifier } from "@azure/communication-common";

import { RoomParticipant } from "./models";

export interface RoomsClientOptions extends CommonClientOptions {}

export interface CreateRoomOptions extends OperationOptions {
  validFrom?: Date;
  validUntil?: Date;
  roomJoinPolicy?: string;
  participants?: RoomParticipant[];
}

export interface UpdateRoomOptions extends OperationOptions {
  validFrom?: Date;
  validUntil?: Date;
  roomJoinPolicy?: string;
  participants?: RoomParticipant[];
}

export type GetRoomOptions = OperationOptions;

export type DeleteRoomOptions = OperationOptions;

export type GetParticipantsOptions = OperationOptions;

export interface AddParticipantsOptions extends OperationOptions {
  participants: RoomParticipant[];
}

export interface UpdateParticipantsOptions extends OperationOptions {
  participants: RoomParticipant[];
}

export interface RemoveParticipantsOptions extends OperationOptions {
  participants: (RoomParticipant | CommunicationIdentifier)[];
}

export interface GetParticipiantsResult {
  participants?: RoomParticipant[];
}
