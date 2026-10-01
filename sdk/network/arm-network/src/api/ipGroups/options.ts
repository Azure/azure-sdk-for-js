// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpGroupsUpdateGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpGroupsGetOptionalParams extends OperationOptions {
  /** Expands resourceIds (of Firewalls/Network Security Groups etc.) back referenced by the IpGroups resource. */
  expand?: string;
}
