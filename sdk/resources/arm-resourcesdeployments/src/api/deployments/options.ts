// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentsCalculateTemplateHashOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsExportTemplateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsWhatIfOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsValidateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListByResourceGroupOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'. */
  filter?: string;
  /** The number of results to get. If null is passed, returns all deployments. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCheckExistenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsExportTemplateAtSubscriptionScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsWhatIfAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsValidateAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCancelAtSubscriptionScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'. */
  filter?: string;
  /** The number of results to get. If null is passed, returns all deployments. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentsDeleteAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetAtSubscriptionScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsExportTemplateAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsWhatIfAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsValidateAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCancelAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'. */
  filter?: string;
  /** The number of results to get. If null is passed, returns all deployments. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentsDeleteAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetAtManagementGroupScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListAtTenantScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'. */
  filter?: string;
  /** The number of results to get. If null is passed, returns all deployments. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentsExportTemplateAtTenantScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsWhatIfAtTenantScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsValidateAtTenantScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCancelAtTenantScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsDeleteAtTenantScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateAtTenantScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCheckExistenceAtTenantScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetAtTenantScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsExportTemplateAtScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsValidateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCancelAtScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListAtScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'. */
  filter?: string;
  /** The number of results to get. If null is passed, returns all deployments. */
  top?: number;
}

/** Optional parameters. */
export interface DeploymentsDeleteAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsCheckExistenceAtScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetAtScopeOptionalParams extends OperationOptions {}
