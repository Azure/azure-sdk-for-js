// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  reconcileConfiguration,
  listConfigurations,
  getConfiguration,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams,
  NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Reconciles the specified network security perimeter configuration for a key vault. */
  reconcileConfiguration: (
    resourceGroupName: string,
    vaultName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams,
  ) => Promise<void>;
  /** Lists the network security perimeter configurations associated with a key vault. */
  listConfigurations: (
    resourceGroupName: string,
    vaultName: string,
    options?: NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the specified network security perimeter configuration for a key vault. */
  getConfiguration: (
    resourceGroupName: string,
    vaultName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: KeyVaultManagementContext) {
  return {
    reconcileConfiguration: (
      resourceGroupName: string,
      vaultName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams,
    ) =>
      reconcileConfiguration(
        context,
        resourceGroupName,
        vaultName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    listConfigurations: (
      resourceGroupName: string,
      vaultName: string,
      options?: NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams,
    ) => listConfigurations(context, resourceGroupName, vaultName, options),
    getConfiguration: (
      resourceGroupName: string,
      vaultName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams,
    ) =>
      getConfiguration(
        context,
        resourceGroupName,
        vaultName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: KeyVaultManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
