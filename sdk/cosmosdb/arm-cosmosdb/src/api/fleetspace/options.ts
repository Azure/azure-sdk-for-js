// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FleetspaceUpdate } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetspaceListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetspaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetspaceUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameters to provide for the current fleetspace. */
  body?: FleetspaceUpdate;
}

/** Optional parameters. */
export interface FleetspaceCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FleetspaceGetOptionalParams extends OperationOptions {}
