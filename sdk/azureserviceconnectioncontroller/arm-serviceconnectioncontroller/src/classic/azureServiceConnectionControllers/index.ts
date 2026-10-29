// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext } from "../../api/networkContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/azureServiceConnectionControllers/operations.js";
import type {
  AzureServiceConnectionControllersListBySubscriptionOptionalParams,
  AzureServiceConnectionControllersListByResourceGroupOptionalParams,
  AzureServiceConnectionControllersUpdateOptionalParams,
  AzureServiceConnectionControllersDeleteOptionalParams,
  AzureServiceConnectionControllersCreateOrUpdateOptionalParams,
  AzureServiceConnectionControllersGetOptionalParams,
} from "../../api/azureServiceConnectionControllers/options.js";
import type {
  AzureServiceConnectionController,
  AzureServiceConnectionControllerTagsUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureServiceConnectionControllers operations. */
export interface AzureServiceConnectionControllersOperations {
  /** Lists all Azure Service Connection Controllers within a subscription. */
  listBySubscription: (
    options?: AzureServiceConnectionControllersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AzureServiceConnectionController>;
  /** Lists all Azure Service Connection Controllers within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AzureServiceConnectionControllersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AzureServiceConnectionController>;
  /** Updates the tags of an Azure Service Connection Controller. */
  update: (
    resourceGroupName: string,
    azureServiceConnectionControllerName: string,
    properties: AzureServiceConnectionControllerTagsUpdate,
    options?: AzureServiceConnectionControllersUpdateOptionalParams,
  ) => Promise<AzureServiceConnectionController>;
  /** Deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation. */
  delete: (
    resourceGroupName: string,
    azureServiceConnectionControllerName: string,
    options?: AzureServiceConnectionControllersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an Azure Service Connection Controller. */
  createOrUpdate: (
    resourceGroupName: string,
    azureServiceConnectionControllerName: string,
    resource: AzureServiceConnectionController,
    options?: AzureServiceConnectionControllersCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<AzureServiceConnectionController>,
    AzureServiceConnectionController
  >;
  /** Gets an Azure Service Connection Controller. */
  get: (
    resourceGroupName: string,
    azureServiceConnectionControllerName: string,
    options?: AzureServiceConnectionControllersGetOptionalParams,
  ) => Promise<AzureServiceConnectionController>;
}

function _getAzureServiceConnectionControllers(context: NetworkContext) {
  return {
    listBySubscription: (
      options?: AzureServiceConnectionControllersListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AzureServiceConnectionControllersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      azureServiceConnectionControllerName: string,
      properties: AzureServiceConnectionControllerTagsUpdate,
      options?: AzureServiceConnectionControllersUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, azureServiceConnectionControllerName, properties, options),
    delete: (
      resourceGroupName: string,
      azureServiceConnectionControllerName: string,
      options?: AzureServiceConnectionControllersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureServiceConnectionControllerName, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureServiceConnectionControllerName: string,
      resource: AzureServiceConnectionController,
      options?: AzureServiceConnectionControllersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        azureServiceConnectionControllerName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureServiceConnectionControllerName: string,
      options?: AzureServiceConnectionControllersGetOptionalParams,
    ) => get(context, resourceGroupName, azureServiceConnectionControllerName, options),
  };
}

export function _getAzureServiceConnectionControllersOperations(
  context: NetworkContext,
): AzureServiceConnectionControllersOperations {
  return {
    ..._getAzureServiceConnectionControllers(context),
  };
}
