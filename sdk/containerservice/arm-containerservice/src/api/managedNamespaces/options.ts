// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedNamespacesListCredentialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedNamespacesListByManagedClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedNamespacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedNamespacesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedNamespacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedNamespacesGetOptionalParams extends OperationOptions {}
