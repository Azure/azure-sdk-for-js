// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import {
  reconcile,
  list,
  get,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Reconcile the specified Network Security Perimeter configuration associated with the Bot. */
  reconcile: (
    resourceGroupName: string,
    resourceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
  /** List Network Security Perimeter configurations associated with the Bot. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the specified Network Security Perimeter configuration associated with the Bot. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: AzureBotServiceContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      resourceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        resourceName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: AzureBotServiceContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
