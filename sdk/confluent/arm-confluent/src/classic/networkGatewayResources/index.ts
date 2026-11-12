// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import {
  list,
  $delete,
  createOrReplace,
  get,
} from "../../api/networkGatewayResources/operations.js";
import type {
  NetworkGatewayResourcesListOptionalParams,
  NetworkGatewayResourcesDeleteOptionalParams,
  NetworkGatewayResourcesCreateOrReplaceOptionalParams,
  NetworkGatewayResourcesGetOptionalParams,
} from "../../api/networkGatewayResources/options.js";
import type { NetworkGatewayResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkGatewayResources operations. */
export interface NetworkGatewayResourcesOperations {
  /** Lists all network gateways in an environment */
  list: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    options?: NetworkGatewayResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkGatewayResource>;
  /** Delete confluent network gateway by id */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    options?: NetworkGatewayResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    options?: NetworkGatewayResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    options?: NetworkGatewayResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or replace a confluent network gateway */
  createOrReplace: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    resource: NetworkGatewayResource,
    options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<NetworkGatewayResource>, NetworkGatewayResource>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    resource: NetworkGatewayResource,
    options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkGatewayResource>, NetworkGatewayResource>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    resource: NetworkGatewayResource,
    options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
  ) => Promise<NetworkGatewayResource>;
  /** Get confluent network gateway by Id */
  get: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    options?: NetworkGatewayResourcesGetOptionalParams,
  ) => Promise<NetworkGatewayResource>;
}
function _getNetworkGatewayResources(context: ConfluentManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      options?: NetworkGatewayResourcesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, environmentId, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      options?: NetworkGatewayResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      options?: NetworkGatewayResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      options?: NetworkGatewayResourcesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      resource: NetworkGatewayResource,
      options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        resource,
        options,
      ),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      resource: NetworkGatewayResource,
      options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      resource: NetworkGatewayResource,
      options?: NetworkGatewayResourcesCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      options?: NetworkGatewayResourcesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, organizationName, environmentId, networkGatewayId, options),
  };
}
export function _getNetworkGatewayResourcesOperations(
  context: ConfluentManagementContext,
): NetworkGatewayResourcesOperations {
  return {
    ..._getNetworkGatewayResources(context),
  };
}
