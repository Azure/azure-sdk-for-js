// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceGroupsExportTemplateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceGroupsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1' */
  filter?: string;
  /** The number of results to return. If null is passed, returns all resource groups. */
  top?: number;
}

/** Optional parameters. */
export interface ResourceGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The resource types you want to force delete. Currently, only the following is supported: forceDeletionTypes=Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets */
  forceDeletionTypes?: string;
}

/** Optional parameters. */
export interface ResourceGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceGroupsCheckExistenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceGroupsGetOptionalParams extends OperationOptions {}
