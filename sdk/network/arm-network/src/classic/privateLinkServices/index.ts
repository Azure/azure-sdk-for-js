// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAutoApprovedPrivateLinkServicesByResourceGroup,
  listAutoApprovedPrivateLinkServices,
  checkPrivateLinkServiceVisibilityByResourceGroup,
  checkPrivateLinkServiceVisibility,
  listPrivateEndpointConnections,
  deletePrivateEndpointConnection,
  updatePrivateEndpointConnection,
  getPrivateEndpointConnection,
  listBySubscription,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateLinkServices/operations.js";
import type {
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams,
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams,
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
  PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams,
  PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams,
  PrivateLinkServicesListBySubscriptionOptionalParams,
  PrivateLinkServicesListOptionalParams,
  PrivateLinkServicesDeleteOptionalParams,
  PrivateLinkServicesCreateOrUpdateOptionalParams,
  PrivateLinkServicesGetOptionalParams,
} from "../../api/privateLinkServices/options.js";
import type {
  PrivateLinkService,
  PrivateEndpointConnection,
  CheckPrivateLinkServiceVisibilityRequest,
  PrivateLinkServiceVisibility,
  AutoApprovedPrivateLinkService,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateLinkServices operations. */
export interface PrivateLinkServicesOperations {
  /** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
  listAutoApprovedPrivateLinkServicesByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutoApprovedPrivateLinkService>;
  /** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
  listAutoApprovedPrivateLinkServices: (
    location: string,
    options?: PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams,
  ) => PagedAsyncIterableIterator<AutoApprovedPrivateLinkService>;
  /** Checks whether the subscription is visible to private link service in the specified resource group. */
  checkPrivateLinkServiceVisibilityByResourceGroup: (
    resourceGroupName: string,
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
  ) => PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>;
  /** @deprecated use checkPrivateLinkServiceVisibilityByResourceGroup instead */
  beginCheckPrivateLinkServiceVisibilityByResourceGroup: (
    resourceGroupName: string,
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>
  >;
  /** @deprecated use checkPrivateLinkServiceVisibilityByResourceGroup instead */
  beginCheckPrivateLinkServiceVisibilityByResourceGroupAndWait: (
    resourceGroupName: string,
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
  ) => Promise<PrivateLinkServiceVisibility>;
  /** Checks whether the subscription is visible to private link service. */
  checkPrivateLinkServiceVisibility: (
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
  ) => PollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>;
  /** @deprecated use checkPrivateLinkServiceVisibility instead */
  beginCheckPrivateLinkServiceVisibility: (
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateLinkServiceVisibility>, PrivateLinkServiceVisibility>
  >;
  /** @deprecated use checkPrivateLinkServiceVisibility instead */
  beginCheckPrivateLinkServiceVisibilityAndWait: (
    location: string,
    parameters: CheckPrivateLinkServiceVisibilityRequest,
    options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
  ) => Promise<PrivateLinkServiceVisibility>;
  /** Gets all private end point connections for a specific private link service. */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete private end point connection for a private link service in a subscription. */
  deletePrivateEndpointConnection: (
    resourceGroupName: string,
    serviceName: string,
    peConnectionName: string,
    options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnection: (
    resourceGroupName: string,
    serviceName: string,
    peConnectionName: string,
    options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    serviceName: string,
    peConnectionName: string,
    options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Approve or reject private end point connection for a private link service in a subscription. */
  updatePrivateEndpointConnection: (
    resourceGroupName: string,
    serviceName: string,
    peConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Get the specific private end point connection by specific private link service in the resource group. */
  getPrivateEndpointConnection: (
    resourceGroupName: string,
    serviceName: string,
    peConnectionName: string,
    options?: PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets all private link service in a subscription. */
  listBySubscription: (
    options?: PrivateLinkServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkService>;
  /** Gets all private link services in a resource group. */
  list: (
    resourceGroupName: string,
    options?: PrivateLinkServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkService>;
  /** Deletes the specified private link service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateLinkServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateLinkServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateLinkServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an private link service in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PrivateLinkService,
    options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateLinkService>, PrivateLinkService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PrivateLinkService,
    options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateLinkService>, PrivateLinkService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PrivateLinkService,
    options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
  ) => Promise<PrivateLinkService>;
  /** Gets the specified private link service by resource group. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateLinkServicesGetOptionalParams,
  ) => Promise<PrivateLinkService>;
}

function _getPrivateLinkServices(context: NetworkManagementContext) {
  return {
    listAutoApprovedPrivateLinkServicesByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams,
    ) =>
      listAutoApprovedPrivateLinkServicesByResourceGroup(
        context,
        resourceGroupName,
        location,
        options,
      ),
    listAutoApprovedPrivateLinkServices: (
      location: string,
      options?: PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams,
    ) => listAutoApprovedPrivateLinkServices(context, location, options),
    checkPrivateLinkServiceVisibilityByResourceGroup: (
      resourceGroupName: string,
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
    ) =>
      checkPrivateLinkServiceVisibilityByResourceGroup(
        context,
        resourceGroupName,
        location,
        parameters,
        options,
      ),
    beginCheckPrivateLinkServiceVisibilityByResourceGroup: async (
      resourceGroupName: string,
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
    ) => {
      const poller = checkPrivateLinkServiceVisibilityByResourceGroup(
        context,
        resourceGroupName,
        location,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckPrivateLinkServiceVisibilityByResourceGroupAndWait: async (
      resourceGroupName: string,
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams,
    ) => {
      return await checkPrivateLinkServiceVisibilityByResourceGroup(
        context,
        resourceGroupName,
        location,
        parameters,
        options,
      );
    },
    checkPrivateLinkServiceVisibility: (
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
    ) => checkPrivateLinkServiceVisibility(context, location, parameters, options),
    beginCheckPrivateLinkServiceVisibility: async (
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
    ) => {
      const poller = checkPrivateLinkServiceVisibility(context, location, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckPrivateLinkServiceVisibilityAndWait: async (
      location: string,
      parameters: CheckPrivateLinkServiceVisibilityRequest,
      options?: PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams,
    ) => {
      return await checkPrivateLinkServiceVisibility(context, location, parameters, options);
    },
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams,
    ) => listPrivateEndpointConnections(context, resourceGroupName, serviceName, options),
    deletePrivateEndpointConnection: (
      resourceGroupName: string,
      serviceName: string,
      peConnectionName: string,
      options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
    ) =>
      deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        serviceName,
        peConnectionName,
        options,
      ),
    beginDeletePrivateEndpointConnection: async (
      resourceGroupName: string,
      serviceName: string,
      peConnectionName: string,
      options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        serviceName,
        peConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeletePrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      peConnectionName: string,
      options?: PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      return await deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        serviceName,
        peConnectionName,
        options,
      );
    },
    updatePrivateEndpointConnection: (
      resourceGroupName: string,
      serviceName: string,
      peConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams,
    ) =>
      updatePrivateEndpointConnection(
        context,
        resourceGroupName,
        serviceName,
        peConnectionName,
        parameters,
        options,
      ),
    getPrivateEndpointConnection: (
      resourceGroupName: string,
      serviceName: string,
      peConnectionName: string,
      options?: PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams,
    ) =>
      getPrivateEndpointConnection(
        context,
        resourceGroupName,
        serviceName,
        peConnectionName,
        options,
      ),
    listBySubscription: (options?: PrivateLinkServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: PrivateLinkServicesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateLinkServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, options),
    beginDelete: async (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateLinkServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateLinkServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serviceName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: PrivateLinkService,
      options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: PrivateLinkService,
      options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: PrivateLinkService,
      options?: PrivateLinkServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serviceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateLinkServicesGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, options),
  };
}

export function _getPrivateLinkServicesOperations(
  context: NetworkManagementContext,
): PrivateLinkServicesOperations {
  return {
    ..._getPrivateLinkServices(context),
  };
}
