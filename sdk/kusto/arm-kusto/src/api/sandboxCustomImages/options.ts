// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SandboxCustomImagesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SandboxCustomImagesListByClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SandboxCustomImagesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxCustomImagesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxCustomImagesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxCustomImagesGetOptionalParams extends OperationOptions {}
