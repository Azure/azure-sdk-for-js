// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  listBySubscription,
  listByCommunityResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dedicatedHub/operations.js";
import type {
  DedicatedHubListBySubscriptionOptionalParams,
  DedicatedHubListByCommunityResourceOptionalParams,
  DedicatedHubDeleteOptionalParams,
  DedicatedHubUpdateOptionalParams,
  DedicatedHubCreateOrUpdateOptionalParams,
  DedicatedHubGetOptionalParams,
} from "../../api/dedicatedHub/options.js";
import type { DedicatedHubResource, DedicatedHubPatchModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DedicatedHub operations. */
export interface DedicatedHubOperations {
  /** List DedicatedHubResource resources by subscription ID */
  listBySubscription: (
    communityName: string,
    options?: DedicatedHubListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHubResource>;
  /** List DedicatedHubResource resources by CommunityResource */
  listByCommunityResource: (
    resourceGroupName: string,
    communityName: string,
    options?: DedicatedHubListByCommunityResourceOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHubResource>;
  /** Delete a DedicatedHubResource */
  delete: (
    resourceGroupName: string,
    communityName: string,
    dedicatedHubName: string,
    options?: DedicatedHubDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a DedicatedHubResource */
  update: (
    resourceGroupName: string,
    communityName: string,
    dedicatedHubName: string,
    properties: DedicatedHubPatchModel,
    options?: DedicatedHubUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource>;
  /** Create a DedicatedHubResource */
  createOrUpdate: (
    resourceGroupName: string,
    communityName: string,
    dedicatedHubName: string,
    resource: DedicatedHubResource,
    options?: DedicatedHubCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource>;
  /** Get a DedicatedHubResource */
  get: (
    resourceGroupName: string,
    communityName: string,
    dedicatedHubName: string,
    options?: DedicatedHubGetOptionalParams,
  ) => Promise<DedicatedHubResource>;
}
function _getDedicatedHub(context: MissionContext) {
  return {
    listBySubscription: (
      communityName: string,
      options?: DedicatedHubListBySubscriptionOptionalParams,
    ) => listBySubscription(context, communityName, options),
    listByCommunityResource: (
      resourceGroupName: string,
      communityName: string,
      options?: DedicatedHubListByCommunityResourceOptionalParams,
    ) => listByCommunityResource(context, resourceGroupName, communityName, options),
    delete: (
      resourceGroupName: string,
      communityName: string,
      dedicatedHubName: string,
      options?: DedicatedHubDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communityName, dedicatedHubName, options),
    update: (
      resourceGroupName: string,
      communityName: string,
      dedicatedHubName: string,
      properties: DedicatedHubPatchModel,
      options?: DedicatedHubUpdateOptionalParams,
    ) => update(context, resourceGroupName, communityName, dedicatedHubName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      communityName: string,
      dedicatedHubName: string,
      resource: DedicatedHubResource,
      options?: DedicatedHubCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        communityName,
        dedicatedHubName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      communityName: string,
      dedicatedHubName: string,
      options?: DedicatedHubGetOptionalParams,
    ) => get(context, resourceGroupName, communityName, dedicatedHubName, options),
  };
}
export function _getDedicatedHubOperations(context: MissionContext): DedicatedHubOperations {
  return {
    ..._getDedicatedHub(context),
  };
}
