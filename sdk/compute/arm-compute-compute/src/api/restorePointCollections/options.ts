// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RestorePointCollectionExpandOptions } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorePointCollectionsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointCollectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointCollectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestorePointCollectionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointCollectionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointCollectionsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. If expand=restorePoints, server will return all contained restore points in the restorePointCollection. */
  expand?: RestorePointCollectionExpandOptions;
}
