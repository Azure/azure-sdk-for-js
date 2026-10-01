// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticMonitorUpgrade } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitorUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Elastic Monitor Upgrade Parameters */
  body?: ElasticMonitorUpgrade;
}
