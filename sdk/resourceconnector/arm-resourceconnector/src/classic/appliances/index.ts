// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceConnectorManagementContext } from "../../api/resourceConnectorManagementContext.js";
import {
  getTelemetryConfig,
  listOperations,
  getUpgradeGraph,
  listKeys,
  listClusterUserCredential,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appliances/operations.js";
import type {
  AppliancesGetTelemetryConfigOptionalParams,
  AppliancesListOperationsOptionalParams,
  AppliancesGetUpgradeGraphOptionalParams,
  AppliancesListKeysOptionalParams,
  AppliancesListClusterUserCredentialOptionalParams,
  AppliancesListBySubscriptionOptionalParams,
  AppliancesListByResourceGroupOptionalParams,
  AppliancesDeleteOptionalParams,
  AppliancesUpdateOptionalParams,
  AppliancesCreateOrUpdateOptionalParams,
  AppliancesGetOptionalParams,
} from "../../api/appliances/options.js";
import type {
  Appliance,
  PatchableAppliance,
  ApplianceListCredentialResults,
  ApplianceListKeysResults,
  UpgradeGraph,
  ApplianceOperation,
  ApplianceGetTelemetryConfigResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Appliances operations. */
export interface AppliancesOperations {
  /** Gets the telemetry config. */
  getTelemetryConfig: (
    options?: AppliancesGetTelemetryConfigOptionalParams,
  ) => Promise<ApplianceGetTelemetryConfigResult>;
  /** Lists all available Appliances operations. */
  listOperations: (
    options?: AppliancesListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<ApplianceOperation>;
  /** Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train. */
  getUpgradeGraph: (
    resourceGroupName: string,
    resourceName: string,
    upgradeGraph: string,
    options?: AppliancesGetUpgradeGraphOptionalParams,
  ) => Promise<UpgradeGraph>;
  /** Returns the cluster customer credentials for the dedicated appliance. */
  listKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: AppliancesListKeysOptionalParams,
  ) => Promise<ApplianceListKeysResults>;
  /** Returns the cluster user credentials for the dedicated appliance. */
  listClusterUserCredential: (
    resourceGroupName: string,
    resourceName: string,
    options?: AppliancesListClusterUserCredentialOptionalParams,
  ) => Promise<ApplianceListCredentialResults>;
  /** Gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance */
  listBySubscription: (
    options?: AppliancesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Appliance>;
  /** Gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AppliancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Appliance>;
  /** Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: AppliancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: PatchableAppliance,
    options?: AppliancesUpdateOptionalParams,
  ) => Promise<Appliance>;
  /** Creates or updates an Appliance in the specified Subscription and Resource Group. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: Appliance,
    options?: AppliancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Appliance>, Appliance>;
  /** Gets the details of an Appliance with a specified resource group and name. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: AppliancesGetOptionalParams,
  ) => Promise<Appliance>;
}

function _getAppliances(context: ResourceConnectorManagementContext) {
  return {
    getTelemetryConfig: (options?: AppliancesGetTelemetryConfigOptionalParams) =>
      getTelemetryConfig(context, options),
    listOperations: (options?: AppliancesListOperationsOptionalParams) =>
      listOperations(context, options),
    getUpgradeGraph: (
      resourceGroupName: string,
      resourceName: string,
      upgradeGraph: string,
      options?: AppliancesGetUpgradeGraphOptionalParams,
    ) => getUpgradeGraph(context, resourceGroupName, resourceName, upgradeGraph, options),
    listKeys: (
      resourceGroupName: string,
      resourceName: string,
      options?: AppliancesListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, resourceName, options),
    listClusterUserCredential: (
      resourceGroupName: string,
      resourceName: string,
      options?: AppliancesListClusterUserCredentialOptionalParams,
    ) => listClusterUserCredential(context, resourceGroupName, resourceName, options),
    listBySubscription: (options?: AppliancesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AppliancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: AppliancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: PatchableAppliance,
      options?: AppliancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: Appliance,
      options?: AppliancesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (resourceGroupName: string, resourceName: string, options?: AppliancesGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getAppliancesOperations(
  context: ResourceConnectorManagementContext,
): AppliancesOperations {
  return {
    ..._getAppliances(context),
  };
}
