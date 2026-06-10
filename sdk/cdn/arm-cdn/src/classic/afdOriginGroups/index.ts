// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  listResourceUsage,
  listByProfile,
  $delete,
  update,
  create,
  get,
} from "../../api/afdOriginGroups/operations.js";
import type {
  AFDOriginGroupsListResourceUsageOptionalParams,
  AFDOriginGroupsListByProfileOptionalParams,
  AFDOriginGroupsDeleteOptionalParams,
  AFDOriginGroupsUpdateOptionalParams,
  AFDOriginGroupsCreateOptionalParams,
  AFDOriginGroupsGetOptionalParams,
} from "../../api/afdOriginGroups/options.js";
import type { Usage, AFDOriginGroup, AFDOriginGroupUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDOriginGroups operations. */
export interface AFDOriginGroupsOperations {
  /** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginGroupsListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Lists all of the existing origin groups within a profile. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: AFDOriginGroupsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<AFDOriginGroup>;
  /** Deletes an existing origin group within a profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing origin group within a profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
    options?: AFDOriginGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
  /** Creates a new origin group within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroup: AFDOriginGroup,
    options?: AFDOriginGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
  /** Gets an existing origin group within a profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginGroupsGetOptionalParams,
  ) => Promise<AFDOriginGroup>;
}

function _getAFDOriginGroups(context: CdnManagementContext) {
  return {
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginGroupsListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, originGroupName, options),
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: AFDOriginGroupsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, originGroupName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
      options?: AFDOriginGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      ),
    create: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroup: AFDOriginGroup,
      options?: AFDOriginGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, originGroupName, originGroup, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, originGroupName, options),
  };
}

export function _getAFDOriginGroupsOperations(
  context: CdnManagementContext,
): AFDOriginGroupsOperations {
  return {
    ..._getAFDOriginGroups(context),
  };
}
