// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsGetOptionalParams extends OperationOptions {}
