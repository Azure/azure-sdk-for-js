// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import {
  reconcile,
  listByConfigurationStore,
  get,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Forces a refresh of the specified network security perimeter configuration. */
  reconcile: (
    resourceGroupName: string,
    configStoreName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    configStoreName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcile instead */
  beginReconcileAndWait: (
    resourceGroupName: string,
    configStoreName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<void>;
  /** Lists all network security perimeter configurations for a configuration store. */
  listByConfigurationStore: (
    resourceGroupName: string,
    configStoreName: string,
    options?: NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the specified network security perimeter configuration associated with the configuration store. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: AppConfigurationManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      configStoreName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        configStoreName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcile: async (
      resourceGroupName: string,
      configStoreName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        configStoreName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      configStoreName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(
        context,
        resourceGroupName,
        configStoreName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    listByConfigurationStore: (
      resourceGroupName: string,
      configStoreName: string,
      options?: NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams,
    ) => listByConfigurationStore(context, resourceGroupName, configStoreName, options),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        configStoreName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: AppConfigurationManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
