// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsPatchesApplyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsPatchesSkipConfigureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsPatchesListByContainerAppOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, $filter=properties/patchApplyStatus eq 'Succeeded' */
  filter?: string;
}

/** Optional parameters. */
export interface ContainerAppsPatchesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsPatchesGetOptionalParams extends OperationOptions {}
