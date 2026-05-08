// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import {
  checkTrafficManagerNameAvailabilityV2,
  checkTrafficManagerRelativeDnsNameAvailability,
  listByResourceGroup,
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/profiles/operations.js";
import {
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "../../api/profiles/options.js";
import {
  DeleteOperationResult,
  Profile,
  CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  TrafficManagerNameAvailability,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Profiles operations. */
export interface ProfilesOperations {
  /** Checks the availability of a Traffic Manager Relative DNS name. */
  checkTrafficManagerNameAvailabilityV2: (
    parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
    options?: ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ) => Promise<TrafficManagerNameAvailability>;
  /** Checks the availability of a Traffic Manager Relative DNS name. */
  checkTrafficManagerRelativeDnsNameAvailability: (
    parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
    options?: ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ) => Promise<TrafficManagerNameAvailability>;
  /** Lists all Traffic Manager profiles within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Profile>;
  /** Lists all Traffic Manager profiles within a subscription. */
  listBySubscription: (
    options?: ProfilesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Profile>;
  /** Deletes a Traffic Manager profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams,
  ) => Promise<DeleteOperationResult>;
  /** Update a Traffic Manager profile. */
  update: (
    resourceGroupName: string,
    profileName: string,
    parameters: Profile,
    options?: ProfilesUpdateOptionalParams,
  ) => Promise<Profile>;
  /** Create or update a Traffic Manager profile. */
  createOrUpdate: (
    resourceGroupName: string,
    profileName: string,
    parameters: Profile,
    options?: ProfilesCreateOrUpdateOptionalParams,
  ) => Promise<Profile>;
  /** Gets a Traffic Manager profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesGetOptionalParams,
  ) => Promise<Profile>;
}

function _getProfiles(context: TrafficManagerManagementContext) {
  return {
    checkTrafficManagerNameAvailabilityV2: (
      parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
      options?: ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
    ) => checkTrafficManagerNameAvailabilityV2(context, parameters, options),
    checkTrafficManagerRelativeDnsNameAvailability: (
      parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
      options?: ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
    ) => checkTrafficManagerRelativeDnsNameAvailability(context, parameters, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: ProfilesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      parameters: Profile,
      options?: ProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      profileName: string,
      parameters: Profile,
      options?: ProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, profileName, parameters, options),
    get: (resourceGroupName: string, profileName: string, options?: ProfilesGetOptionalParams) =>
      get(context, resourceGroupName, profileName, options),
  };
}

export function _getProfilesOperations(
  context: TrafficManagerManagementContext,
): ProfilesOperations {
  return {
    ..._getProfiles(context),
  };
}
