// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationSecurityGroupsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationSecurityGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationSecurityGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationSecurityGroupsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationSecurityGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApplicationSecurityGroupsGetOptionalParams extends OperationOptions {}
