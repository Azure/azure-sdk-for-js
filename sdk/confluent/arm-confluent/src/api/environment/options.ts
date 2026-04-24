// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SCEnvironmentRecord } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnvironmentDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnvironmentCreateOrUpdateOptionalParams extends OperationOptions {
  /** Confluent Environment resource model */
  body?: SCEnvironmentRecord;
}
