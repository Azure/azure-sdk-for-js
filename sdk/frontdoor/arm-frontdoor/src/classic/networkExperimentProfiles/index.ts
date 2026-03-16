// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/networkExperimentProfiles/operations.js";
import type {
  NetworkExperimentProfilesListOptionalParams,
  NetworkExperimentProfilesListByResourceGroupOptionalParams,
  NetworkExperimentProfilesDeleteOptionalParams,
  NetworkExperimentProfilesUpdateOptionalParams,
  NetworkExperimentProfilesCreateOrUpdateOptionalParams,
  NetworkExperimentProfilesGetOptionalParams,
} from "../../api/networkExperimentProfiles/options.js";
import type { Profile, ProfileUpdateModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkExperimentProfiles operations. */
export interface NetworkExperimentProfilesOperations {
  /** Gets a list of Network Experiment Profiles under a subscription */
  list: (
    options?: NetworkExperimentProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<Profile>;
  /** Gets a list of Network Experiment Profiles within a resource group under a subscription */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkExperimentProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Profile>;
  /** Deletes an NetworkExperiment Profile by ProfileName */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    profileName: string,
    options?: NetworkExperimentProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    options?: NetworkExperimentProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    options?: NetworkExperimentProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an NetworkExperimentProfiles */
  update: (
    resourceGroupName: string,
    profileName: string,
    parameters: ProfileUpdateModel,
    options?: NetworkExperimentProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    parameters: ProfileUpdateModel,
    options?: NetworkExperimentProfilesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Profile>, Profile>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    parameters: ProfileUpdateModel,
    options?: NetworkExperimentProfilesUpdateOptionalParams,
  ) => Promise<Profile>;
  /** Creates an NetworkExperiment Profile */
  createOrUpdate: (
    profileName: string,
    resourceGroupName: string,
    parameters: Profile,
    options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    profileName: string,
    resourceGroupName: string,
    parameters: Profile,
    options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Profile>, Profile>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    profileName: string,
    resourceGroupName: string,
    parameters: Profile,
    options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
  ) => Promise<Profile>;
  /** Gets an NetworkExperiment Profile by ProfileName */
  get: (
    resourceGroupName: string,
    profileName: string,
    options?: NetworkExperimentProfilesGetOptionalParams,
  ) => Promise<Profile>;
}

function _getNetworkExperimentProfiles(context: FrontDoorManagementContext) {
  return {
    list: (options?: NetworkExperimentProfilesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkExperimentProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      options?: NetworkExperimentProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, options),
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      options?: NetworkExperimentProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      options?: NetworkExperimentProfilesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, options);
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      parameters: ProfileUpdateModel,
      options?: NetworkExperimentProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      parameters: ProfileUpdateModel,
      options?: NetworkExperimentProfilesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, profileName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      parameters: ProfileUpdateModel,
      options?: NetworkExperimentProfilesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, profileName, parameters, options);
    },
    createOrUpdate: (
      profileName: string,
      resourceGroupName: string,
      parameters: Profile,
      options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, profileName, resourceGroupName, parameters, options),
    beginCreateOrUpdate: async (
      profileName: string,
      resourceGroupName: string,
      parameters: Profile,
      options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, profileName, resourceGroupName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      profileName: string,
      resourceGroupName: string,
      parameters: Profile,
      options?: NetworkExperimentProfilesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, profileName, resourceGroupName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      profileName: string,
      options?: NetworkExperimentProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, options),
  };
}

export function _getNetworkExperimentProfilesOperations(
  context: FrontDoorManagementContext,
): NetworkExperimentProfilesOperations {
  return {
    ..._getNetworkExperimentProfiles(context),
  };
}
