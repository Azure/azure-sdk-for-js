// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ThroughputPoolUpdate } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ThroughputPoolDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ThroughputPoolUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameters to provide for the current Throughput Pool. */
  body?: ThroughputPoolUpdate;
}

/** Optional parameters. */
export interface ThroughputPoolCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ThroughputPoolGetOptionalParams extends OperationOptions {}
