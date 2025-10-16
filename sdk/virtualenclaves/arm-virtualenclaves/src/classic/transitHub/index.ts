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
} from "../../api/transitHub/operations.js";
import type {
  TransitHubListBySubscriptionOptionalParams,
  TransitHubListByCommunityResourceOptionalParams,
  TransitHubDeleteOptionalParams,
  TransitHubUpdateOptionalParams,
  TransitHubCreateOrUpdateOptionalParams,
  TransitHubGetOptionalParams,
} from "../../api/transitHub/options.js";
import type { TransitHubResource, TransitHubPatchModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TransitHub operations. */
export interface TransitHubOperations {
  /** List TransitHubResource resources by subscription ID */
  listBySubscription: (
    communityName: string,
    options?: TransitHubListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<TransitHubResource>;
  /** List TransitHubResource resources by CommunityResource */
  listByCommunityResource: (
    resourceGroupName: string,
    communityName: string,
    options?: TransitHubListByCommunityResourceOptionalParams,
  ) => PagedAsyncIterableIterator<TransitHubResource>;
  /** Delete a TransitHubResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    communityName: string,
    transitHubName: string,
    options?: TransitHubDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a TransitHubResource */
  update: (
    resourceGroupName: string,
    communityName: string,
    transitHubName: string,
    properties: TransitHubPatchModel,
    options?: TransitHubUpdateOptionalParams,
  ) => PollerLike<OperationState<TransitHubResource>, TransitHubResource>;
  /** Create a TransitHubResource */
  createOrUpdate: (
    resourceGroupName: string,
    communityName: string,
    transitHubName: string,
    resource: TransitHubResource,
    options?: TransitHubCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TransitHubResource>, TransitHubResource>;
  /** Get a TransitHubResource */
  get: (
    resourceGroupName: string,
    communityName: string,
    transitHubName: string,
    options?: TransitHubGetOptionalParams,
  ) => Promise<TransitHubResource>;
}

function _getTransitHub(context: MissionContext) {
  return {
    listBySubscription: (
      communityName: string,
      options?: TransitHubListBySubscriptionOptionalParams,
    ) => listBySubscription(context, communityName, options),
    listByCommunityResource: (
      resourceGroupName: string,
      communityName: string,
      options?: TransitHubListByCommunityResourceOptionalParams,
    ) => listByCommunityResource(context, resourceGroupName, communityName, options),
    delete: (
      resourceGroupName: string,
      communityName: string,
      transitHubName: string,
      options?: TransitHubDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communityName, transitHubName, options),
    update: (
      resourceGroupName: string,
      communityName: string,
      transitHubName: string,
      properties: TransitHubPatchModel,
      options?: TransitHubUpdateOptionalParams,
    ) => update(context, resourceGroupName, communityName, transitHubName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      communityName: string,
      transitHubName: string,
      resource: TransitHubResource,
      options?: TransitHubCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, communityName, transitHubName, resource, options),
    get: (
      resourceGroupName: string,
      communityName: string,
      transitHubName: string,
      options?: TransitHubGetOptionalParams,
    ) => get(context, resourceGroupName, communityName, transitHubName, options),
  };
}

export function _getTransitHubOperations(context: MissionContext): TransitHubOperations {
  return {
    ..._getTransitHub(context),
  };
}
