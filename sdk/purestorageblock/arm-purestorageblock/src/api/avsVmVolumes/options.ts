// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvsVmVolumesListByAvsVmOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsVmVolumesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvsVmVolumesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsVmVolumesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
