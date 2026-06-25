// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowTriggerHistoriesResubmitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkflowTriggerHistoriesListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The filter to apply on the operation. Options for filters include: Status, StartTime, and ClientTrackingId. */
  filter?: string;
}

/** Optional parameters. */
export interface WorkflowTriggerHistoriesGetOptionalParams extends OperationOptions {}
