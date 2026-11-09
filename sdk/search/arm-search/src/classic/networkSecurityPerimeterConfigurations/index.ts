// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import {
  reconcile,
  listByService,
  get,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration. */
  reconcile: (
    resourceGroupName: string,
    searchServiceName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    searchServiceName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcile instead */
  beginReconcileAndWait: (
    resourceGroupName: string,
    searchServiceName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<void>;
  /** Gets a list of network security perimeter configurations for a search service. */
  listByService: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets a network security perimeter configuration. */
  get: (
    resourceGroupName: string,
    searchServiceName: string,
    nspConfigName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: SearchManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      searchServiceName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => reconcile(context, resourceGroupName, searchServiceName, nspConfigName, options),
    beginReconcile: async (
      resourceGroupName: string,
      searchServiceName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        searchServiceName,
        nspConfigName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      searchServiceName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(context, resourceGroupName, searchServiceName, nspConfigName, options);
    },
    listByService: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, searchServiceName, options),
    get: (
      resourceGroupName: string,
      searchServiceName: string,
      nspConfigName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, searchServiceName, nspConfigName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: SearchManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
