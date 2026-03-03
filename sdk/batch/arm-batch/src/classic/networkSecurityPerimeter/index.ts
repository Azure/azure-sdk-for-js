// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  reconcileConfiguration,
  listConfigurations,
  getConfiguration,
} from "../../api/networkSecurityPerimeter/operations.js";
import type {
  NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  NetworkSecurityPerimeterListConfigurationsOptionalParams,
  NetworkSecurityPerimeterGetConfigurationOptionalParams,
} from "../../api/networkSecurityPerimeter/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeter operations. */
export interface NetworkSecurityPerimeterOperations {
  /** Reconciles the specified NSP configuration. */
  reconcileConfiguration: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all of the NSP configurations in the specified account. */
  listConfigurations: (
    resourceGroupName: string,
    accountName: string,
    options?: NetworkSecurityPerimeterListConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets information about the specified NSP configuration. */
  getConfiguration: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterGetConfigurationOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeter(context: BatchManagementContext) {
  return {
    reconcileConfiguration: (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
    ) =>
      reconcileConfiguration(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    listConfigurations: (
      resourceGroupName: string,
      accountName: string,
      options?: NetworkSecurityPerimeterListConfigurationsOptionalParams,
    ) => listConfigurations(context, resourceGroupName, accountName, options),
    getConfiguration: (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterGetConfigurationOptionalParams,
    ) =>
      getConfiguration(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterOperations(
  context: BatchManagementContext,
): NetworkSecurityPerimeterOperations {
  return {
    ..._getNetworkSecurityPerimeter(context),
  };
}
