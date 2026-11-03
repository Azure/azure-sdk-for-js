// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryCodeContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface RegistryCodeContainersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryCodeContainersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryCodeContainersGetOptionalParams extends OperationOptions {}
