// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  /** Set this flag to true if, at the time of the call, dial out to a PSTN number is enabled in a particular room. By default, this flag is set to false. */
  pstnDialOutEnabled?: boolean;
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
  /** Set this flag to true if, at the time of the call, dial out to a PSTN number is enabled in a particular room. By default, this flag is set to false. */
  pstnDialOutEnabled?: boolean;
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
