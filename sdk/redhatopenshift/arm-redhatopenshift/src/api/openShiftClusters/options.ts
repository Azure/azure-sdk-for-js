// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OpenShiftClustersListCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenShiftClustersListAdminCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenShiftClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenShiftClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OpenShiftClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OpenShiftClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OpenShiftClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OpenShiftClustersGetOptionalParams extends OperationOptions {}
