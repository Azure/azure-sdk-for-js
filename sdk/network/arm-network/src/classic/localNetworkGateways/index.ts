// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/localNetworkGateways/operations.js";
import type {
  LocalNetworkGatewaysListOptionalParams,
  LocalNetworkGatewaysDeleteOptionalParams,
  LocalNetworkGatewaysUpdateTagsOptionalParams,
  LocalNetworkGatewaysCreateOrUpdateOptionalParams,
  LocalNetworkGatewaysGetOptionalParams,
} from "../../api/localNetworkGateways/options.js";
import type { TagsObject, LocalNetworkGateway } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LocalNetworkGateways operations. */
export interface LocalNetworkGatewaysOperations {
  /** Gets all the local network gateways in a resource group. */
  list: (
    resourceGroupName: string,
    options?: LocalNetworkGatewaysListOptionalParams,
  ) => PagedAsyncIterableIterator<LocalNetworkGateway>;
  /** Deletes the specified local network gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    options?: LocalNetworkGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    options?: LocalNetworkGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    options?: LocalNetworkGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a local network gateway tags. */
  updateTags: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    parameters: TagsObject,
    options?: LocalNetworkGatewaysUpdateTagsOptionalParams,
  ) => Promise<LocalNetworkGateway>;
  /** Creates or updates a local network gateway in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    parameters: LocalNetworkGateway,
    options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocalNetworkGateway>, LocalNetworkGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    parameters: LocalNetworkGateway,
    options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LocalNetworkGateway>, LocalNetworkGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    parameters: LocalNetworkGateway,
    options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<LocalNetworkGateway>;
  /** Gets the specified local network gateway in a resource group. */
  get: (
    resourceGroupName: string,
    localNetworkGatewayName: string,
    options?: LocalNetworkGatewaysGetOptionalParams,
  ) => Promise<LocalNetworkGateway>;
}

function _getLocalNetworkGateways(context: NetworkManagementContext) {
  return {
    list: (resourceGroupName: string, options?: LocalNetworkGatewaysListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      options?: LocalNetworkGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localNetworkGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      options?: LocalNetworkGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, localNetworkGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      options?: LocalNetworkGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, localNetworkGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      parameters: TagsObject,
      options?: LocalNetworkGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, localNetworkGatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      parameters: LocalNetworkGateway,
      options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localNetworkGatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      parameters: LocalNetworkGateway,
      options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        localNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      parameters: LocalNetworkGateway,
      options?: LocalNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        localNetworkGatewayName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      localNetworkGatewayName: string,
      options?: LocalNetworkGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, localNetworkGatewayName, options),
  };
}

export function _getLocalNetworkGatewaysOperations(
  context: NetworkManagementContext,
): LocalNetworkGatewaysOperations {
  return {
    ..._getLocalNetworkGateways(context),
  };
}
