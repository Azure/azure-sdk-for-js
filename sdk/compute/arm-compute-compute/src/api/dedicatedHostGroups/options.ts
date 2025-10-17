// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InstanceViewTypes } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DedicatedHostGroupsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostGroupsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHostGroupsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the dedicated hosts under the dedicated host group. 'UserData' is not supported for dedicated host group. */
  expand?: InstanceViewTypes;
}
