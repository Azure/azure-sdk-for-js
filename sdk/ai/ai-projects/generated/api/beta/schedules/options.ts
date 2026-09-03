// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ScheduleTaskType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaSchedulesListRunsOptionalParams extends OperationOptions {
  /** Filter by the type of schedule. */
  typeParam?: ScheduleTaskType;
  /** Filter by the enabled status. */
  enabled?: boolean;
}

/** Optional parameters. */
export interface BetaSchedulesGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSchedulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSchedulesListOptionalParams extends OperationOptions {
  /** Filter by the type of schedule. */
  typeParam?: ScheduleTaskType;
  /** Filter by the enabled status. */
  enabled?: boolean;
}

/** Optional parameters. */
export interface BetaSchedulesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSchedulesDeleteOptionalParams extends OperationOptions {}
