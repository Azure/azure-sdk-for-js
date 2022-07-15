// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Options to create rooms client.
 */
export interface RoomsClientOptions extends CommonClientOptions {}

/**
 * Options to create a room.
 */
export interface CreateRoomOptions extends OperationOptions {}

/**
 * Options to update a room.
 */
export interface UpdateRoomOptions extends OperationOptions {}

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
export interface AddParticipantsOptions extends OperationOptions {}

/**
 * Options to update the participants of a room.
 */
export interface UpdateParticipantsOptions extends OperationOptions {}

/**
 * Options to remove participants from a room.
 */
export interface RemoveParticipantsOptions extends OperationOptions {}

/**
 * Options to remove all participants from a room.
 */
export interface RemoveAllParticipantsOptions extends OperationOptions {}
