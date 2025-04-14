// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapContext } from "../../api/dependencyMapContext.js";
import {
  MapsResource,
  MapsResourceTagsUpdate,
  GetDependencyViewForFocusedMachineRequest,
  GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  GetConnectionsForProcessOnFocusedMachineRequest,
  ExportDependenciesRequest,
} from "../../models/models.js";
import {
  MapsExportDependenciesOptionalParams,
  MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
  MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
  MapsGetDependencyViewForFocusedMachineOptionalParams,
  MapsListBySubscriptionOptionalParams,
  MapsListByResourceGroupOptionalParams,
  MapsDeleteOptionalParams,
  MapsUpdateOptionalParams,
  MapsCreateOrUpdateOptionalParams,
  MapsGetOptionalParams,
} from "../../api/maps/options.js";
import {
  exportDependencies,
  getConnectionsForProcessOnFocusedMachine,
  getConnectionsWithConnectedMachineForFocusedMachine,
  getDependencyViewForFocusedMachine,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/maps/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Maps operations. */
export interface MapsOperations {
  /** Export dependencies */
  exportDependencies: (
    resourceGroupName: string,
    mapName: string,
    body: ExportDependenciesRequest,
    options?: MapsExportDependenciesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get network connections of a process */
  getConnectionsForProcessOnFocusedMachine: (
    resourceGroupName: string,
    mapName: string,
    body: GetConnectionsForProcessOnFocusedMachineRequest,
    options?: MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get network connections between machines */
  getConnectionsWithConnectedMachineForFocusedMachine: (
    resourceGroupName: string,
    mapName: string,
    body: GetConnectionsWithConnectedMachineForFocusedMachineRequest,
    options?: MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get dependency map of single machine */
  getDependencyViewForFocusedMachine: (
    resourceGroupName: string,
    mapName: string,
    body: GetDependencyViewForFocusedMachineRequest,
    options?: MapsGetDependencyViewForFocusedMachineOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List MapsResource resources by subscription ID */
  listBySubscription: (
    options?: MapsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MapsResource>;
  /** List MapsResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MapsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MapsResource>;
  /** Delete a MapsResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mapName: string,
    options?: MapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a MapsResource */
  update: (
    resourceGroupName: string,
    mapName: string,
    properties: MapsResourceTagsUpdate,
    options?: MapsUpdateOptionalParams,
  ) => PollerLike<OperationState<MapsResource>, MapsResource>;
  /** Create a MapsResource */
  createOrUpdate: (
    resourceGroupName: string,
    mapName: string,
    resource: MapsResource,
    options?: MapsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MapsResource>, MapsResource>;
  /** Get a MapsResource */
  get: (
    resourceGroupName: string,
    mapName: string,
    options?: MapsGetOptionalParams,
  ) => Promise<MapsResource>;
}

function _getMaps(context: DependencyMapContext) {
  return {
    exportDependencies: (
      resourceGroupName: string,
      mapName: string,
      body: ExportDependenciesRequest,
      options?: MapsExportDependenciesOptionalParams,
    ) => exportDependencies(context, resourceGroupName, mapName, body, options),
    getConnectionsForProcessOnFocusedMachine: (
      resourceGroupName: string,
      mapName: string,
      body: GetConnectionsForProcessOnFocusedMachineRequest,
      options?: MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
    ) =>
      getConnectionsForProcessOnFocusedMachine(context, resourceGroupName, mapName, body, options),
    getConnectionsWithConnectedMachineForFocusedMachine: (
      resourceGroupName: string,
      mapName: string,
      body: GetConnectionsWithConnectedMachineForFocusedMachineRequest,
      options?: MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
    ) =>
      getConnectionsWithConnectedMachineForFocusedMachine(
        context,
        resourceGroupName,
        mapName,
        body,
        options,
      ),
    getDependencyViewForFocusedMachine: (
      resourceGroupName: string,
      mapName: string,
      body: GetDependencyViewForFocusedMachineRequest,
      options?: MapsGetDependencyViewForFocusedMachineOptionalParams,
    ) => getDependencyViewForFocusedMachine(context, resourceGroupName, mapName, body, options),
    listBySubscription: (options?: MapsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MapsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, mapName: string, options?: MapsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, mapName, options),
    update: (
      resourceGroupName: string,
      mapName: string,
      properties: MapsResourceTagsUpdate,
      options?: MapsUpdateOptionalParams,
    ) => update(context, resourceGroupName, mapName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      mapName: string,
      resource: MapsResource,
      options?: MapsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, mapName, resource, options),
    get: (resourceGroupName: string, mapName: string, options?: MapsGetOptionalParams) =>
      get(context, resourceGroupName, mapName, options),
  };
}

export function _getMapsOperations(context: DependencyMapContext): MapsOperations {
  return {
    ..._getMaps(context),
  };
}
