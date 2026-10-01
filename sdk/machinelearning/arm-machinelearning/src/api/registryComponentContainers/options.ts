// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryComponentContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface RegistryComponentContainersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryComponentContainersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryComponentContainersGetOptionalParams extends OperationOptions {}
