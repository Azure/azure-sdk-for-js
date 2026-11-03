// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceStateName, MaintenanceStatusFilter } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MaintenancesInitiateChecksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenancesScheduleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenancesRescheduleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenancesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MaintenancesListOptionalParams extends OperationOptions {
  /** Filter maintenances based on state */
  stateName?: MaintenanceStateName;
  /** Filter active or inactive maintenances */
  status?: MaintenanceStatusFilter;
  /** date from which result should be returned. ie. scheduledStartTime >= from */
  fromParam?: Date;
  /** date till which result should be returned. i.e. scheduledStartTime <= to */
  to?: Date;
}
