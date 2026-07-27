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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    options?: AFDOriginGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing origin group within a profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
    options?: AFDOriginGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
    options?: AFDOriginGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
    options?: AFDOriginGroupsUpdateOptionalParams,
  ) => Promise<AFDOriginGroup>;
  /** Creates a new origin group within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroup: AFDOriginGroup,
    options?: AFDOriginGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroup: AFDOriginGroup,
    options?: AFDOriginGroupsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    originGroupName: string,
    originGroup: AFDOriginGroup,
    options?: AFDOriginGroupsCreateOptionalParams,
  ) => Promise<AFDOriginGroup>;
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
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, originGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      options?: AFDOriginGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, originGroupName, options);
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
      options?: AFDOriginGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
      options?: AFDOriginGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroup: AFDOriginGroup,
      options?: AFDOriginGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, originGroupName, originGroup, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroup: AFDOriginGroup,
      options?: AFDOriginGroupsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroup,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      originGroupName: string,
      originGroup: AFDOriginGroup,
      options?: AFDOriginGroupsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroup,
        options,
      );
    },
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
