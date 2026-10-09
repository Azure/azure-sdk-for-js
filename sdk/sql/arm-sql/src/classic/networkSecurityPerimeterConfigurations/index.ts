// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  reconcile,
  listByServer,
  get,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByServerOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Reconcile network security perimeter configuration for SQL Resource Provider */
  reconcile: (
    resourceGroupName: string,
    serverName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    serverName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkSecurityPerimeterConfiguration>,
      NetworkSecurityPerimeterConfiguration
    >
  >;
  /** @deprecated use reconcile instead */
  beginReconcileAndWait: (
    resourceGroupName: string,
    serverName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Gets a list of NSP configurations for a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: NetworkSecurityPerimeterConfigurationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets a network security perimeter configuration. */
  get: (
    resourceGroupName: string,
    serverName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: SqlManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      serverName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => reconcile(context, resourceGroupName, serverName, nspConfigName, options),
    beginReconcile: async (
      resourceGroupName: string,
      serverName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(context, resourceGroupName, serverName, nspConfigName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      serverName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(context, resourceGroupName, serverName, nspConfigName, options);
    },
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: NetworkSecurityPerimeterConfigurationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, nspConfigName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: SqlManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
