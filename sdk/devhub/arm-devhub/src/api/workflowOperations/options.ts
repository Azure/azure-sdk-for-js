// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowOperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowOperationsListByResourceGroupOptionalParams extends OperationOptions {
  /** The ManagedCluster resource associated with the workflows. */
  managedClusterResource?: string;
}

/** Optional parameters. */
export interface WorkflowOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowOperationsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowOperationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowOperationsGetOptionalParams extends OperationOptions {}
