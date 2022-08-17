// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Additional options for the Get Alpha ID Configuration request.
 */
export interface GetConfigurationOptions extends OperationOptions {}

/**
 * Additional options for the Upsert Alpha ID Configuration request.
 */
export interface UpsertConfigurationOptions extends OperationOptions {}

export { AlphaIdConfiguration } from "./generated/src/models/";
