// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowListByResourceGroupOptionalParams extends OperationOptions {
  /** The ManagedCluster resource associated with the workflows. */
  managedClusterResource?: string;
}

/** Optional parameters. */
export interface WorkflowDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowGetOptionalParams extends OperationOptions {}
