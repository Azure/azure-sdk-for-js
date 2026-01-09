// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsStorageContainerVolumesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvsStorageContainerVolumesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsStorageContainerVolumesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
