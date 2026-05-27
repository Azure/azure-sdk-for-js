// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementContext } from "../../api/customLocationsManagementContext.js";
import {
  findTargetResourceGroup,
  listEnabledResourceTypes,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  listOperations,
} from "../../api/customLocations/operations.js";
import {
  CustomLocationsFindTargetResourceGroupOptionalParams,
  CustomLocationsListEnabledResourceTypesOptionalParams,
  CustomLocationsListBySubscriptionOptionalParams,
  CustomLocationsListByResourceGroupOptionalParams,
  CustomLocationsDeleteOptionalParams,
  CustomLocationsUpdateOptionalParams,
  CustomLocationsCreateOrUpdateOptionalParams,
  CustomLocationsGetOptionalParams,
  CustomLocationsListOperationsOptionalParams,
} from "../../api/customLocations/options.js";
import {
  CustomLocationOperation,
  CustomLocation,
  PatchableCustomLocations,
  EnabledResourceType,
  CustomLocationFindTargetResourceGroupProperties,
  CustomLocationFindTargetResourceGroupResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomLocations operations. */
export interface CustomLocationsOperations {
  /** Returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request. */
  findTargetResourceGroup: (
    resourceGroupName: string,
    resourceName: string,
    parameters: CustomLocationFindTargetResourceGroupProperties,
    options?: CustomLocationsFindTargetResourceGroupOptionalParams,
  ) => Promise<CustomLocationFindTargetResourceGroupResult>;
  /** Gets the list of the Enabled Resource Types. */
  listEnabledResourceTypes: (
    resourceGroupName: string,
    resourceName: string,
    options?: CustomLocationsListEnabledResourceTypesOptionalParams,
  ) => PagedAsyncIterableIterator<EnabledResourceType>;
  /** Gets a list of Custom Locations in the specified subscription. The operation returns properties of each Custom Location */
  listBySubscription: (
    options?: CustomLocationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CustomLocation>;
  /** Gets a list of Custom Locations in the specified subscription and resource group. The operation returns properties of each Custom Location. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CustomLocationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CustomLocation>;
  /** Deletes the Custom Location with the specified Resource Name, Resource Group, and Subscription Id. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: CustomLocationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    options?: CustomLocationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: CustomLocationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: PatchableCustomLocations,
    options?: CustomLocationsUpdateOptionalParams,
  ) => Promise<CustomLocation>;
  /** Creates or updates a Custom Location in the specified Subscription and Resource Group */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: CustomLocation,
    options?: CustomLocationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomLocation>, CustomLocation>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: CustomLocation,
    options?: CustomLocationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomLocation>, CustomLocation>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: CustomLocation,
    options?: CustomLocationsCreateOrUpdateOptionalParams,
  ) => Promise<CustomLocation>;
  /** Gets the details of the customLocation with a specified resource group and name. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: CustomLocationsGetOptionalParams,
  ) => Promise<CustomLocation>;
  /** Lists all available Custom Locations operations. */
  listOperations: (
    options?: CustomLocationsListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<CustomLocationOperation>;
}

function _getCustomLocations(context: CustomLocationsManagementContext) {
  return {
    findTargetResourceGroup: (
      resourceGroupName: string,
      resourceName: string,
      parameters: CustomLocationFindTargetResourceGroupProperties,
      options?: CustomLocationsFindTargetResourceGroupOptionalParams,
    ) => findTargetResourceGroup(context, resourceGroupName, resourceName, parameters, options),
    listEnabledResourceTypes: (
      resourceGroupName: string,
      resourceName: string,
      options?: CustomLocationsListEnabledResourceTypesOptionalParams,
    ) => listEnabledResourceTypes(context, resourceGroupName, resourceName, options),
    listBySubscription: (options?: CustomLocationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CustomLocationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: CustomLocationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      options?: CustomLocationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: CustomLocationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: PatchableCustomLocations,
      options?: CustomLocationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: CustomLocation,
      options?: CustomLocationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: CustomLocation,
      options?: CustomLocationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: CustomLocation,
      options?: CustomLocationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: CustomLocationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
    listOperations: (options?: CustomLocationsListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getCustomLocationsOperations(
  context: CustomLocationsManagementContext,
): CustomLocationsOperations {
  return {
    ..._getCustomLocations(context),
  };
}
