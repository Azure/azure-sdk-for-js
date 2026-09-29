// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext } from "../../api/networkContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/profileProbingGateways/operations.js";
import type {
  ProfileProbingGatewaysListByParentOptionalParams,
  ProfileProbingGatewaysDeleteOptionalParams,
  ProfileProbingGatewaysUpdateOptionalParams,
  ProfileProbingGatewaysCreateOrUpdateOptionalParams,
  ProfileProbingGatewaysGetOptionalParams,
} from "../../api/profileProbingGateways/options.js";
import type { ProfileProbingGateway, ProfileProbingGatewayUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProfileProbingGateways operations. */
export interface ProfileProbingGatewaysOperations {
  /** Lists all probing gateways associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
  listByParent: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    options?: ProfileProbingGatewaysListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ProfileProbingGateway>;
  /** Deletes a probing gateway association from a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
  delete: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    profileProbingGatewayName: string,
    options?: ProfileProbingGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
  update: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    profileProbingGatewayName: string,
    properties: ProfileProbingGatewayUpdate,
    options?: ProfileProbingGatewaysUpdateOptionalParams,
  ) => PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway>;
  /** Creates or updates a probing gateway association with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
  createOrUpdate: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    profileProbingGatewayName: string,
    resource: ProfileProbingGateway,
    options?: ProfileProbingGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProfileProbingGateway>, ProfileProbingGateway>;
  /** Gets a probing gateway associated with a Private Traffic Manager profile. Only available when the parent profile has `customTopologyMapMode` set to `Disabled`. */
  get: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    profileProbingGatewayName: string,
    options?: ProfileProbingGatewaysGetOptionalParams,
  ) => Promise<ProfileProbingGateway>;
}

function _getProfileProbingGateways(context: NetworkContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      options?: ProfileProbingGatewaysListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, privateTrafficManagerProfileName, options),
    delete: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      profileProbingGatewayName: string,
      options?: ProfileProbingGatewaysDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        options,
      ),
    update: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      profileProbingGatewayName: string,
      properties: ProfileProbingGatewayUpdate,
      options?: ProfileProbingGatewaysUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      profileProbingGatewayName: string,
      resource: ProfileProbingGateway,
      options?: ProfileProbingGatewaysCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      profileProbingGatewayName: string,
      options?: ProfileProbingGatewaysGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        profileProbingGatewayName,
        options,
      ),
  };
}

export function _getProfileProbingGatewaysOperations(
  context: NetworkContext,
): ProfileProbingGatewaysOperations {
  return {
    ..._getProfileProbingGateways(context),
  };
}
