// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerImagesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerImagesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerImagesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerImagesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerImagesGetOptionalParams extends OperationOptions {}
