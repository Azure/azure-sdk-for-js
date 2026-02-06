// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnterpriseMccCacheNodesOperationsGetOptionalParams extends OperationOptions {}
