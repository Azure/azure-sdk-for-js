// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsGetBgpCidrsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsListByIspCustomerResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IspCacheNodesOperationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IspCacheNodesOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IspCacheNodesOperationsGetOptionalParams extends OperationOptions {}
