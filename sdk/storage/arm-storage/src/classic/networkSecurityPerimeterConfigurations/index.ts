// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Refreshes any information about the association. */
  reconcile: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcile instead */
  beginReconcileAndWait: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<void>;
  /** Gets list of effective NetworkSecurityPerimeterConfiguration for storage account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets effective NetworkSecurityPerimeterConfiguration for association */
  get: (
    resourceGroupName: string,
    accountName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: StorageManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcile: async (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        accountName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: StorageManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
