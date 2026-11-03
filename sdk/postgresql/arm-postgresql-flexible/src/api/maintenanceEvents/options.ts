// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceEventStatusFilter } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MaintenanceEventsApplyNowOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MaintenanceEventsRescheduleOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MaintenanceEventsListOptionalParams extends OperationOptions {
  /** Filter maintenance events by status. */
  maintenanceStatus?: MaintenanceEventStatusFilter;
}

/** Optional parameters. */
export interface MaintenanceEventsGetOptionalParams extends OperationOptions {}
