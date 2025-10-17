// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProximityPlacementGroupsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ProximityPlacementGroupsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ProximityPlacementGroupsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProximityPlacementGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProximityPlacementGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProximityPlacementGroupsGetOptionalParams extends OperationOptions {
  /** includeColocationStatus=true enables fetching the colocation status of all the resources in the proximity placement group. */
  includeColocationStatus?: string;
}
