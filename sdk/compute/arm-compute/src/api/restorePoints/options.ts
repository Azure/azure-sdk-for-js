// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestorePointExpandOptions } from "../../models/compute/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorePointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestorePointsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestorePointsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' retrieves information about the run-time state of a restore point. */
  expand?: RestorePointExpandOptions;
}
