// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualHubIpConfiguration/operations.js";
import type {
  VirtualHubIpConfigurationListOptionalParams,
  VirtualHubIpConfigurationDeleteOptionalParams,
  VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
  VirtualHubIpConfigurationGetOptionalParams,
} from "../../api/virtualHubIpConfiguration/options.js";
import type { HubIpConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHubIpConfiguration operations. */
export interface VirtualHubIpConfigurationOperations {
  /** Retrieves the details of all VirtualHubIpConfigurations. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubIpConfigurationListOptionalParams,
  ) => PagedAsyncIterableIterator<HubIpConfiguration>;
  /** Deletes a VirtualHubIpConfiguration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    options?: VirtualHubIpConfigurationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    options?: VirtualHubIpConfigurationDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    options?: VirtualHubIpConfigurationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    parameters: HubIpConfiguration,
    options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HubIpConfiguration>, HubIpConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    parameters: HubIpConfiguration,
    options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HubIpConfiguration>, HubIpConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    parameters: HubIpConfiguration,
    options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<HubIpConfiguration>;
  /** Retrieves the details of a Virtual Hub Ip configuration. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    ipConfigName: string,
    options?: VirtualHubIpConfigurationGetOptionalParams,
  ) => Promise<HubIpConfiguration>;
}

function _getVirtualHubIpConfiguration(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubIpConfigurationListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      options?: VirtualHubIpConfigurationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, ipConfigName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      options?: VirtualHubIpConfigurationDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, ipConfigName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      options?: VirtualHubIpConfigurationDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, ipConfigName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      parameters: HubIpConfiguration,
      options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, virtualHubName, ipConfigName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      parameters: HubIpConfiguration,
      options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        ipConfigName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      parameters: HubIpConfiguration,
      options?: VirtualHubIpConfigurationCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        ipConfigName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      ipConfigName: string,
      options?: VirtualHubIpConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, ipConfigName, options),
  };
}

export function _getVirtualHubIpConfigurationOperations(
  context: NetworkManagementContext,
): VirtualHubIpConfigurationOperations {
  return {
    ..._getVirtualHubIpConfiguration(context),
  };
}
