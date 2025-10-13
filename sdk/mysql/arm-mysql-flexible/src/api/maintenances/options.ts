// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceUpdate } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MaintenancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenancesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required parameters for update maintenance on a server. */
  parameters?: MaintenanceUpdate;
}

/** Optional parameters. */
export interface MaintenancesReadOptionalParams extends OperationOptions {}
