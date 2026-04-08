// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobTargetExecutionsListByJobExecutionOptionalParams extends OperationOptions {
  /** If specified, only job executions created at or after the specified time are included. */
  createTimeMin?: Date;
  /** If specified, only job executions created before the specified time are included. */
  createTimeMax?: Date;
  /** If specified, only job executions completed at or after the specified time are included. */
  endTimeMin?: Date;
  /** If specified, only job executions completed before the specified time are included. */
  endTimeMax?: Date;
  /** If specified, only active or only completed job executions are included. */
  isActive?: boolean;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** The number of elements to return from the collection. */
  top?: number;
}

/** Optional parameters. */
export interface JobTargetExecutionsListByStepOptionalParams extends OperationOptions {
  /** If specified, only job executions created at or after the specified time are included. */
  createTimeMin?: Date;
  /** If specified, only job executions created before the specified time are included. */
  createTimeMax?: Date;
  /** If specified, only job executions completed at or after the specified time are included. */
  endTimeMin?: Date;
  /** If specified, only job executions completed before the specified time are included. */
  endTimeMax?: Date;
  /** If specified, only active or only completed job executions are included. */
  isActive?: boolean;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** The number of elements to return from the collection. */
  top?: number;
}

/** Optional parameters. */
export interface JobTargetExecutionsGetOptionalParams extends OperationOptions {}
