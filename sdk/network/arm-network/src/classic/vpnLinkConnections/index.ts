// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getIkeSas,
  resetConnection,
  listByVpnConnection,
  listDefaultSharedKey,
  listAllSharedKeys,
  setOrInitDefaultSharedKey,
  getDefaultSharedKey,
} from "../../api/vpnLinkConnections/operations.js";
import type {
  VpnLinkConnectionsGetIkeSasOptionalParams,
  VpnLinkConnectionsResetConnectionOptionalParams,
  VpnLinkConnectionsListByVpnConnectionOptionalParams,
  VpnLinkConnectionsListDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsListAllSharedKeysOptionalParams,
  VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsGetDefaultSharedKeyOptionalParams,
} from "../../api/vpnLinkConnections/options.js";
import type {
  VpnSiteLinkConnection,
  ConnectionSharedKeyResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnLinkConnections operations. */
export interface VpnLinkConnectionsOperations {
  /** Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group. */
  getIkeSas: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsGetIkeSasOptionalParams,
  ) => PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
  /** @deprecated use getIkeSas instead */
  beginGetIkeSas: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsGetIkeSasOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<{
        body: string;
      }>,
      {
        body: string;
      }
    >
  >;
  /** @deprecated use getIkeSas instead */
  beginGetIkeSasAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsGetIkeSasOptionalParams,
  ) => Promise<{
    body: string;
  }>;
  /** Resets the VpnLink connection specified. */
  resetConnection: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsResetConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetConnection instead */
  beginResetConnection: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsResetConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetConnection instead */
  beginResetConnectionAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsResetConnectionOptionalParams,
  ) => Promise<void>;
  /** Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection. */
  listByVpnConnection: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: VpnLinkConnectionsListByVpnConnectionOptionalParams,
  ) => PagedAsyncIterableIterator<VpnSiteLinkConnection>;
  /** Gets the value of the shared key of VpnLink connection specified. */
  listDefaultSharedKey: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsListDefaultSharedKeyOptionalParams,
  ) => Promise<ConnectionSharedKeyResult>;
  /** Lists all shared keys of VpnLink connection specified. */
  listAllSharedKeys: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsListAllSharedKeysOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionSharedKeyResult>;
  /** Sets or auto generates the shared key based on the user input. If users give a shared key value, it does the set operation. If key length is given, the operation creates a random key of the pre-defined length. */
  setOrInitDefaultSharedKey: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    connectionSharedKeyParameters: ConnectionSharedKeyResult,
    options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  ) => PollerLike<OperationState<ConnectionSharedKeyResult>, ConnectionSharedKeyResult>;
  /** @deprecated use setOrInitDefaultSharedKey instead */
  beginSetOrInitDefaultSharedKey: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    connectionSharedKeyParameters: ConnectionSharedKeyResult,
    options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ConnectionSharedKeyResult>, ConnectionSharedKeyResult>
  >;
  /** @deprecated use setOrInitDefaultSharedKey instead */
  beginSetOrInitDefaultSharedKeyAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    connectionSharedKeyParameters: ConnectionSharedKeyResult,
    options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  ) => Promise<ConnectionSharedKeyResult>;
  /** Gets the shared key of VpnLink connection specified. */
  getDefaultSharedKey: (
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    linkConnectionName: string,
    options?: VpnLinkConnectionsGetDefaultSharedKeyOptionalParams,
  ) => Promise<ConnectionSharedKeyResult>;
}

function _getVpnLinkConnections(context: NetworkManagementContext) {
  return {
    getIkeSas: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsGetIkeSasOptionalParams,
    ) =>
      getIkeSas(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    beginGetIkeSas: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsGetIkeSasOptionalParams,
    ) => {
      const poller = getIkeSas(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetIkeSasAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsGetIkeSasOptionalParams,
    ) => {
      return await getIkeSas(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      );
    },
    resetConnection: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsResetConnectionOptionalParams,
    ) =>
      resetConnection(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    beginResetConnection: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsResetConnectionOptionalParams,
    ) => {
      const poller = resetConnection(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetConnectionAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsResetConnectionOptionalParams,
    ) => {
      return await resetConnection(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      );
    },
    listByVpnConnection: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      options?: VpnLinkConnectionsListByVpnConnectionOptionalParams,
    ) => listByVpnConnection(context, resourceGroupName, gatewayName, connectionName, options),
    listDefaultSharedKey: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsListDefaultSharedKeyOptionalParams,
    ) =>
      listDefaultSharedKey(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    listAllSharedKeys: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsListAllSharedKeysOptionalParams,
    ) =>
      listAllSharedKeys(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
    setOrInitDefaultSharedKey: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      connectionSharedKeyParameters: ConnectionSharedKeyResult,
      options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
    ) =>
      setOrInitDefaultSharedKey(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        connectionSharedKeyParameters,
        options,
      ),
    beginSetOrInitDefaultSharedKey: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      connectionSharedKeyParameters: ConnectionSharedKeyResult,
      options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
    ) => {
      const poller = setOrInitDefaultSharedKey(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        connectionSharedKeyParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetOrInitDefaultSharedKeyAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      connectionSharedKeyParameters: ConnectionSharedKeyResult,
      options?: VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
    ) => {
      return await setOrInitDefaultSharedKey(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        connectionSharedKeyParameters,
        options,
      );
    },
    getDefaultSharedKey: (
      resourceGroupName: string,
      gatewayName: string,
      connectionName: string,
      linkConnectionName: string,
      options?: VpnLinkConnectionsGetDefaultSharedKeyOptionalParams,
    ) =>
      getDefaultSharedKey(
        context,
        resourceGroupName,
        gatewayName,
        connectionName,
        linkConnectionName,
        options,
      ),
  };
}

export function _getVpnLinkConnectionsOperations(
  context: NetworkManagementContext,
): VpnLinkConnectionsOperations {
  return {
    ..._getVpnLinkConnections(context),
  };
}
