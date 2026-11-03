// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  reconcileForPrivateLinkScope,
  listByPrivateLinkScope,
  getByPrivateLinkScope,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  NetworkSecurityPerimeterConfigurationReconcileResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Forces the network security perimeter configuration to refresh for a private link scope. */
  reconcileForPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    perimeterName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfigurationReconcileResult>,
    NetworkSecurityPerimeterConfigurationReconcileResult
  >;
  /** @deprecated use reconcileForPrivateLinkScope instead */
  beginReconcileForPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    perimeterName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkSecurityPerimeterConfigurationReconcileResult>,
      NetworkSecurityPerimeterConfigurationReconcileResult
    >
  >;
  /** @deprecated use reconcileForPrivateLinkScope instead */
  beginReconcileForPrivateLinkScopeAndWait: (
    resourceGroupName: string,
    scopeName: string,
    perimeterName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfigurationReconcileResult>;
  /** Lists the network security perimeter configurations for a private link scope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the network security perimeter configuration for a private link scope. */
  getByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    perimeterName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: HybridComputeManagementContext) {
  return {
    reconcileForPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      perimeterName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
    ) =>
      reconcileForPrivateLinkScope(context, resourceGroupName, scopeName, perimeterName, options),
    beginReconcileForPrivateLinkScope: async (
      resourceGroupName: string,
      scopeName: string,
      perimeterName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
    ) => {
      const poller = reconcileForPrivateLinkScope(
        context,
        resourceGroupName,
        scopeName,
        perimeterName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileForPrivateLinkScopeAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      perimeterName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
    ) => {
      return await reconcileForPrivateLinkScope(
        context,
        resourceGroupName,
        scopeName,
        perimeterName,
        options,
      );
    },
    listByPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      options?: NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams,
    ) => listByPrivateLinkScope(context, resourceGroupName, scopeName, options),
    getByPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      perimeterName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams,
    ) => getByPrivateLinkScope(context, resourceGroupName, scopeName, perimeterName, options),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: HybridComputeManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
