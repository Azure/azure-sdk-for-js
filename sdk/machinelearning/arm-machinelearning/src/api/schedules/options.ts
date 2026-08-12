// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ScheduleListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchedulesListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Status filter for schedule. */
  listViewType?: ScheduleListViewType;
}

/** Optional parameters. */
export interface SchedulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchedulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchedulesGetOptionalParams extends OperationOptions {}
