// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  checkAddressSpaceAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/community/operations.js";
import type {
  CommunityCheckAddressSpaceAvailabilityOptionalParams,
  CommunityListBySubscriptionOptionalParams,
  CommunityListByResourceGroupOptionalParams,
  CommunityDeleteOptionalParams,
  CommunityUpdateOptionalParams,
  CommunityCreateOrUpdateOptionalParams,
  CommunityGetOptionalParams,
} from "../../api/community/options.js";
import type {
  CommunityResource,
  CommunityPatchModel,
  CheckAddressSpaceAvailabilityRequest,
  CheckAddressSpaceAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Community operations. */
export interface CommunityOperations {
  /** Checks that the IP Address Space to be allocated for this Community is available. */
  checkAddressSpaceAvailability: (
    resourceGroupName: string,
    communityName: string,
    checkAddressSpaceAvailabilityRequest: CheckAddressSpaceAvailabilityRequest,
    options?: CommunityCheckAddressSpaceAvailabilityOptionalParams,
  ) => Promise<CheckAddressSpaceAvailabilityResponse>;
  /** List CommunityResource resources by subscription ID */
  listBySubscription: (
    options?: CommunityListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityResource>;
  /** List CommunityResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CommunityListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CommunityResource>;
  /** Delete a CommunityResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    communityName: string,
    options?: CommunityDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a CommunityResource */
  update: (
    resourceGroupName: string,
    communityName: string,
    properties: CommunityPatchModel,
    options?: CommunityUpdateOptionalParams,
  ) => PollerLike<OperationState<CommunityResource>, CommunityResource>;
  /** Create a CommunityResource */
  createOrUpdate: (
    resourceGroupName: string,
    communityName: string,
    resource: CommunityResource,
    options?: CommunityCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CommunityResource>, CommunityResource>;
  /** Get a CommunityResource */
  get: (
    resourceGroupName: string,
    communityName: string,
    options?: CommunityGetOptionalParams,
  ) => Promise<CommunityResource>;
}

function _getCommunity(context: MissionContext) {
  return {
    checkAddressSpaceAvailability: (
      resourceGroupName: string,
      communityName: string,
      checkAddressSpaceAvailabilityRequest: CheckAddressSpaceAvailabilityRequest,
      options?: CommunityCheckAddressSpaceAvailabilityOptionalParams,
    ) =>
      checkAddressSpaceAvailability(
        context,
        resourceGroupName,
        communityName,
        checkAddressSpaceAvailabilityRequest,
        options,
      ),
    listBySubscription: (options?: CommunityListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CommunityListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      communityName: string,
      options?: CommunityDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communityName, options),
    update: (
      resourceGroupName: string,
      communityName: string,
      properties: CommunityPatchModel,
      options?: CommunityUpdateOptionalParams,
    ) => update(context, resourceGroupName, communityName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      communityName: string,
      resource: CommunityResource,
      options?: CommunityCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, communityName, resource, options),
    get: (resourceGroupName: string, communityName: string, options?: CommunityGetOptionalParams) =>
      get(context, resourceGroupName, communityName, options),
  };
}

export function _getCommunityOperations(context: MissionContext): CommunityOperations {
  return {
    ..._getCommunity(context),
  };
}
