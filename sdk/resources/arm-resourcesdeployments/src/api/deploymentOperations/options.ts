// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentOperationsListOptionalParams extends OperationOptions {
  /** The number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentOperationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentOperationsListAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** The number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentOperationsGetAtSubscriptionScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentOperationsListAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** The number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentOperationsGetAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentOperationsListAtTenantScopeOptionalParams extends OperationOptions {
  /** The number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentOperationsGetAtTenantScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentOperationsListAtScopeOptionalParams extends OperationOptions {
  /** The number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentOperationsGetAtScopeOptionalParams extends OperationOptions {}
