// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

export interface RoomsClientOptions extends CommonClientOptions {}

export interface CreateRoomOptions extends OperationOptions {}

export interface UpdateRoomOptions extends OperationOptions {}

export type GetRoomOptions = OperationOptions;

export type DeleteRoomOptions = OperationOptions;

export type GetParticipantsOptions = OperationOptions;

export interface AddParticipantsOptions extends OperationOptions {}

export interface UpdateParticipantsOptions extends OperationOptions {}

export interface RemoveParticipantsOptions extends OperationOptions {}
