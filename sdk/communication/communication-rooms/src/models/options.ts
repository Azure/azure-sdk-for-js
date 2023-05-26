// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { RoomParticipantPatch } from "./models";

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
  /** Collection of participants invited to the room. */
  participants?: RoomParticipantPatch[];
}

/**
 * Options to update a room.
 */
export interface UpdateRoomOptions extends OperationOptions {
  /** The timestamp from when the room is open for joining. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validFrom?: Date;
  /** The timestamp from when the room can no longer be joined. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  validUntil?: Date;
}

/**
 * Options to get a room.
 */
export type GetRoomOptions = OperationOptions;

/**
 * Options to get the list of a rooms.
 */
export type ListRoomOptions = OperationOptions;

/**
 * Options to delete a room.
 */
export type DeleteRoomOptions = OperationOptions;

/**
 * Options to get the participants of a room.
 */
export type ListParticipantsOptions = OperationOptions;

/**
 * Options to update the participants of a room.
 */
export type AddOrUpdateParticipantsOptions = OperationOptions;

/**
 * Options to remove participants from a room.
 */
export type RemoveParticipantsOptions = OperationOptions;
