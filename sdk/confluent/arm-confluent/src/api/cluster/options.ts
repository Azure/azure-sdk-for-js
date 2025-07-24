// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SCClusterRecord } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClusterDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClusterCreateOrUpdateOptionalParams extends OperationOptions {
  /** Confluent Cluster resource model */
  body?: SCClusterRecord;
}
