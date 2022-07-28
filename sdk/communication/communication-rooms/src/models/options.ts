// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { RoomParticipant, RoomJoinPolicy } from "./models";

/**
 * Options to create rooms client.
 */
export interface RoomsClientOptions extends CommonClientOptions {}

/**
 * Options to create a room.
 */
export interface CreateRoomOptions extends OperationOptions {
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
  /** The room join policy for the room. */
  roomJoinPolicy?: RoomJoinPolicy;
  /** Collection of participants invited to the room. */
  participants?: RoomParticipant[];
}

/**
 * Options to update a room.
 */
export interface UpdateRoomOptions extends OperationOptions {
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
  /** The room join policy for the room. */
  roomJoinPolicy?: RoomJoinPolicy;
  /** Collection of participants invited to the room. */
  participants?: RoomParticipant[];
}

/**
 * Options to get a room.
 */
export type GetRoomOptions = OperationOptions;

/**
 * Options to delete a room.
 */
export type DeleteRoomOptions = OperationOptions;

/**
 * Options to get the participants of a room.
 */
export type GetParticipantsOptions = OperationOptions;

/**
 * Options to add participants to a room.
 */
export type AddParticipantsOptions = OperationOptions;

/**
 * Options to update the participants of a room.
 */
export type UpdateParticipantsOptions = OperationOptions;

/**
 * Options to remove participants from a room.
 */
export type RemoveParticipantsOptions = OperationOptions;
