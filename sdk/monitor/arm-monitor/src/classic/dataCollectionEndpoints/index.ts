// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  reconcileNSP,
  listNSP,
  getNSP,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/dataCollectionEndpoints/operations.js";
import type {
  DataCollectionEndpointsReconcileNSPOptionalParams,
  DataCollectionEndpointsListNSPOptionalParams,
  DataCollectionEndpointsGetNSPOptionalParams,
  DataCollectionEndpointsListBySubscriptionOptionalParams,
  DataCollectionEndpointsListByResourceGroupOptionalParams,
  DataCollectionEndpointsDeleteOptionalParams,
  DataCollectionEndpointsUpdateOptionalParams,
  DataCollectionEndpointsCreateOptionalParams,
  DataCollectionEndpointsGetOptionalParams,
} from "../../api/dataCollectionEndpoints/options.js";
import type { MicrosoftDataCollectionDataCollectionEndpointResource } from "../../models/microsoft/dataCollection/models.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataCollectionEndpoints operations. */
export interface DataCollectionEndpointsOperations {
  /** Reconciles the specified NSP configuration for the specified data collection endpoint. */
  reconcileNSP: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: DataCollectionEndpointsReconcileNSPOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSP: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: DataCollectionEndpointsReconcileNSPOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSPAndWait: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: DataCollectionEndpointsReconcileNSPOptionalParams,
  ) => Promise<void>;
  /** Gets a list of NSP configurations for the specified data collection endpoint. */
  listNSP: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsListNSPOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets the specified NSP configuration for the specified data collection endpoint. */
  getNSP: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: DataCollectionEndpointsGetNSPOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Lists all data collection endpoints in the specified subscription */
  listBySubscription: (
    options?: DataCollectionEndpointsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionEndpointResource>;
  /** Lists all data collection endpoints in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionEndpointResource>;
  /** Deletes a data collection endpoint. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates part of a data collection endpoint. */
  update: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsUpdateOptionalParams,
  ) => Promise<MicrosoftDataCollectionDataCollectionEndpointResource>;
  /** Creates or updates a data collection endpoint. */
  create: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsCreateOptionalParams,
  ) => Promise<MicrosoftDataCollectionDataCollectionEndpointResource>;
  /** Returns the specified data collection endpoint. */
  get: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsGetOptionalParams,
  ) => Promise<MicrosoftDataCollectionDataCollectionEndpointResource>;
}

function _getDataCollectionEndpoints(context: MonitorContext) {
  return {
    reconcileNSP: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: DataCollectionEndpointsReconcileNSPOptionalParams,
    ) =>
      reconcileNSP(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcileNSP: async (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: DataCollectionEndpointsReconcileNSPOptionalParams,
    ) => {
      const poller = reconcileNSP(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileNSPAndWait: async (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: DataCollectionEndpointsReconcileNSPOptionalParams,
    ) => {
      return await reconcileNSP(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    listNSP: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionEndpointsListNSPOptionalParams,
    ) => listNSP(context, resourceGroupName, dataCollectionEndpointName, options),
    getNSP: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: DataCollectionEndpointsGetNSPOptionalParams,
    ) =>
      getNSP(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    listBySubscription: (options?: DataCollectionEndpointsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dataCollectionEndpointName, options),
    update: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dataCollectionEndpointName, options),
    create: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionEndpointsCreateOptionalParams,
    ) => create(context, resourceGroupName, dataCollectionEndpointName, options),
    get: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, dataCollectionEndpointName, options),
  };
}

export function _getDataCollectionEndpointsOperations(
  context: MonitorContext,
): DataCollectionEndpointsOperations {
  return {
    ..._getDataCollectionEndpoints(context),
  };
}
