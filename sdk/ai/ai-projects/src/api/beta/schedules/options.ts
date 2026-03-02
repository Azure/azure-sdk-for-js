// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ScheduleTaskType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaSchedulesListRunsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filter by the type of schedule. */
  typeParam?: ScheduleTaskType;
  /** Filter by the enabled status. */
  enabled?: boolean;
}

/** Optional parameters. */
export interface BetaSchedulesGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSchedulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaSchedulesListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filter by the type of schedule. */
  typeParam?: ScheduleTaskType;
  /** Filter by the enabled status. */
  enabled?: boolean;
}

/** Optional parameters. */
export interface BetaSchedulesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaSchedulesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
