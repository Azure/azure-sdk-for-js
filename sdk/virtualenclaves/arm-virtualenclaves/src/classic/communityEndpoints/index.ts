// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  handleApprovalDeletion,
  handleApprovalCreation,
  listBySubscription,
  listByCommunityResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/communityEndpoints/operations.js";
import type {
  CommunityEndpointsHandleApprovalDeletionOptionalParams,
  CommunityEndpointsHandleApprovalCreationOptionalParams,
  CommunityEndpointsListBySubscriptionOptionalParams,
  CommunityEndpointsListByCommunityResourceOptionalParams,
  CommunityEndpointsDeleteOptionalParams,
  CommunityEndpointsUpdateOptionalParams,
  CommunityEndpointsCreateOrUpdateOptionalParams,
  CommunityEndpointsGetOptionalParams,
} from "../../api/communityEndpoints/options.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  CommunityEndpointResource,
  CommunityEndpointPatchModel,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CommunityEndpoints operations. */
export interface CommunityEndpointsOperations {
  /** Callback that triggers on approval deletion state change. */
  handleApprovalDeletion: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    body: ApprovalDeletionCallbackRequest,
    options?: CommunityEndpointsHandleApprovalDeletionOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** Callback that triggers on approval state change. */
  handleApprovalCreation: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    body: ApprovalCallbackRequest,
    options?: CommunityEndpointsHandleApprovalCreationOptionalParams,
  ) => PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
  /** List CommunityEndpointResource resources by subscription ID */
  listBySubscription: (
    communityName: string,
    options?: CommunityEndpointsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityEndpointResource>;
  /** List CommunityEndpointResource resources by CommunityResource */
  listByCommunityResource: (
    resourceGroupName: string,
    communityName: string,
    options?: CommunityEndpointsListByCommunityResourceOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityEndpointResource>;
  /** Delete a CommunityEndpointResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    options?: CommunityEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a CommunityEndpointResource */
  update: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    properties: CommunityEndpointPatchModel,
    options?: CommunityEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource>;
  /** Create a CommunityEndpointResource */
  createOrUpdate: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    resource: CommunityEndpointResource,
    options?: CommunityEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource>;
  /** Get a CommunityEndpointResource */
  get: (
    resourceGroupName: string,
    communityName: string,
    communityEndpointName: string,
    options?: CommunityEndpointsGetOptionalParams,
  ) => Promise<CommunityEndpointResource>;
}

function _getCommunityEndpoints(context: MissionContext) {
  return {
    handleApprovalDeletion: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      body: ApprovalDeletionCallbackRequest,
      options?: CommunityEndpointsHandleApprovalDeletionOptionalParams,
    ) =>
      handleApprovalDeletion(
        context,
        resourceGroupName,
        communityName,
        communityEndpointName,
        body,
        options,
      ),
    handleApprovalCreation: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      body: ApprovalCallbackRequest,
      options?: CommunityEndpointsHandleApprovalCreationOptionalParams,
    ) =>
      handleApprovalCreation(
        context,
        resourceGroupName,
        communityName,
        communityEndpointName,
        body,
        options,
      ),
    listBySubscription: (
      communityName: string,
      options?: CommunityEndpointsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, communityName, options),
    listByCommunityResource: (
      resourceGroupName: string,
      communityName: string,
      options?: CommunityEndpointsListByCommunityResourceOptionalParams,
    ) => listByCommunityResource(context, resourceGroupName, communityName, options),
    delete: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      options?: CommunityEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communityName, communityEndpointName, options),
    update: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      properties: CommunityEndpointPatchModel,
      options?: CommunityEndpointsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, communityName, communityEndpointName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      resource: CommunityEndpointResource,
      options?: CommunityEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        communityName,
        communityEndpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      communityName: string,
      communityEndpointName: string,
      options?: CommunityEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, communityName, communityEndpointName, options),
  };
}

export function _getCommunityEndpointsOperations(
  context: MissionContext,
): CommunityEndpointsOperations {
  return {
    ..._getCommunityEndpoints(context),
  };
}
