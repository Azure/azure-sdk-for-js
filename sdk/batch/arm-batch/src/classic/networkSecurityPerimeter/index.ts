// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  reconcileConfiguration,
  listConfigurations,
  getConfiguration,
} from "../../api/networkSecurityPerimeter/operations.js";
import {
  NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  NetworkSecurityPerimeterListConfigurationsOptionalParams,
  NetworkSecurityPerimeterGetConfigurationOptionalParams,
} from "../../api/networkSecurityPerimeter/options.js";
import { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeter operations. */
export interface NetworkSecurityPerimeterOperations {
  /** Reconciles the specified NSP configuration. */
  reconcileConfiguration: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcileConfiguration instead */
  beginReconcileConfiguration: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcileConfiguration instead */
  beginReconcileConfigurationAndWait: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
  ) => Promise<void>;
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
    beginReconcileConfiguration: async (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
    ) => {
      const poller = reconcileConfiguration(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileConfigurationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterReconcileConfigurationOptionalParams,
    ) => {
      return await reconcileConfiguration(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
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
