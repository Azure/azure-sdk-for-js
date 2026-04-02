// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/virtualHubBgpConnection/operations.js";
import type {
  VirtualHubBgpConnectionDeleteOptionalParams,
  VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
  VirtualHubBgpConnectionGetOptionalParams,
} from "../../api/virtualHubBgpConnection/options.js";
import type { BgpConnection } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHubBgpConnection operations. */
export interface VirtualHubBgpConnectionOperations {
  /** Deletes a VirtualHubBgpConnection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    parameters: BgpConnection,
    options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BgpConnection>, BgpConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    parameters: BgpConnection,
    options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BgpConnection>, BgpConnection>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    parameters: BgpConnection,
    options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
  ) => Promise<BgpConnection>;
  /** Retrieves the details of a Virtual Hub Bgp Connection. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    connectionName: string,
    options?: VirtualHubBgpConnectionGetOptionalParams,
  ) => Promise<BgpConnection>;
}

function _getVirtualHubBgpConnection(context: NetworkManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, connectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, connectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, connectionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      parameters: BgpConnection,
      options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      parameters: BgpConnection,
      options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      parameters: BgpConnection,
      options?: VirtualHubBgpConnectionCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        connectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      connectionName: string,
      options?: VirtualHubBgpConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, connectionName, options),
  };
}

export function _getVirtualHubBgpConnectionOperations(
  context: NetworkManagementContext,
): VirtualHubBgpConnectionOperations {
  return {
    ..._getVirtualHubBgpConnection(context),
  };
}
