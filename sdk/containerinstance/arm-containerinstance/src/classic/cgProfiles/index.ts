// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import { listByResourceGroup, listBySubscription } from "../../api/cgProfiles/operations.js";
import type {
  CGProfilesListByResourceGroupOptionalParams,
  CGProfilesListBySubscriptionOptionalParams,
} from "../../api/cgProfiles/options.js";
import type { ContainerGroupProfile } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CGProfiles operations. */
export interface CGProfilesOperations {
  /** Gets a list of all container group profiles under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CGProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerGroupProfile>;
  /** Gets a list of all container group profiles under a subscription. */
  listBySubscription: (
    options?: CGProfilesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerGroupProfile>;
}

function _getCGProfiles(context: ContainerInstanceManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CGProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: CGProfilesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getCGProfilesOperations(
  context: ContainerInstanceManagementContext,
): CGProfilesOperations {
  return {
    ..._getCGProfiles(context),
  };
}
