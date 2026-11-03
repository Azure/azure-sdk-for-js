// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
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
  /** Reconcile the NSP configuration for an account. */
  reconcile: (
    resourceGroupName: string,
    accountName: string,
    nspConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    accountName: string,
    nspConfigurationName: string,
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
    accountName: string,
    nspConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Gets a list of NSP configurations for an account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the specified NSP configurations for an account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    nspConfigurationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: CognitiveServicesManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      accountName: string,
      nspConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => reconcile(context, resourceGroupName, accountName, nspConfigurationName, options),
    beginReconcile: async (
      resourceGroupName: string,
      accountName: string,
      nspConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        accountName,
        nspConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      accountName: string,
      nspConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(
        context,
        resourceGroupName,
        accountName,
        nspConfigurationName,
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
      nspConfigurationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, nspConfigurationName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: CognitiveServicesManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
