// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServerEndpointUpdateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerEndpointsRecallActionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerEndpointsListBySyncGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Any of the properties applicable in PUT request. */
  parameters?: ServerEndpointUpdateParameters;
}

/** Optional parameters. */
export interface ServerEndpointsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerEndpointsGetOptionalParams extends OperationOptions {}
