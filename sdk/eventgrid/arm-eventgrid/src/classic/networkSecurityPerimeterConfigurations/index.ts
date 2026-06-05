// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
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
import type {
  NetworkSecurityPerimeterConfiguration,
  NetworkSecurityPerimeterResourceType,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Reconcile a specific network security perimeter configuration for a given network security perimeter association with a topic or domain. */
  reconcile: (
    resourceGroupName: string,
    resourceType: NetworkSecurityPerimeterResourceType,
    resourceName: string,
    perimeterGuid: string,
    associationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    resourceType: NetworkSecurityPerimeterResourceType,
    resourceName: string,
    perimeterGuid: string,
    associationName: string,
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
    resourceType: NetworkSecurityPerimeterResourceType,
    resourceName: string,
    perimeterGuid: string,
    associationName: string,
    options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Get all network security perimeter configurations associated with a topic or domain. */
  list: (
    resourceGroupName: string,
    resourceType: NetworkSecurityPerimeterResourceType,
    resourceName: string,
    options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Get a specific network security perimeter configuration with a topic or domain. */
  get: (
    resourceGroupName: string,
    resourceType: NetworkSecurityPerimeterResourceType,
    resourceName: string,
    perimeterGuid: string,
    associationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: EventGridManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      resourceType: NetworkSecurityPerimeterResourceType,
      resourceName: string,
      perimeterGuid: string,
      associationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        perimeterGuid,
        associationName,
        options,
      ),
    beginReconcile: async (
      resourceGroupName: string,
      resourceType: NetworkSecurityPerimeterResourceType,
      resourceName: string,
      perimeterGuid: string,
      associationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        perimeterGuid,
        associationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      resourceType: NetworkSecurityPerimeterResourceType,
      resourceName: string,
      perimeterGuid: string,
      associationName: string,
      options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
    ) => {
      return await reconcile(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        perimeterGuid,
        associationName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      resourceType: NetworkSecurityPerimeterResourceType,
      resourceName: string,
      options?: NetworkSecurityPerimeterConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceType, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceType: NetworkSecurityPerimeterResourceType,
      resourceName: string,
      perimeterGuid: string,
      associationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        perimeterGuid,
        associationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: EventGridManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
