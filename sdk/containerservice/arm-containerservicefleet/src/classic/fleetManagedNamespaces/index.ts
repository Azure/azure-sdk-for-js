// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import {
  update,
  listByFleet,
  $delete,
  createOrUpdate,
  get,
} from "../../api/fleetManagedNamespaces/operations.js";
import type {
  FleetManagedNamespacesUpdateOptionalParams,
  FleetManagedNamespacesListByFleetOptionalParams,
  FleetManagedNamespacesDeleteOptionalParams,
  FleetManagedNamespacesCreateOrUpdateOptionalParams,
  FleetManagedNamespacesGetOptionalParams,
} from "../../api/fleetManagedNamespaces/options.js";
import type { FleetManagedNamespace, FleetManagedNamespacePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FleetManagedNamespaces operations. */
export interface FleetManagedNamespacesOperations {
  /** Update a FleetManagedNamespace */
  update: (
    resourceGroupName: string,
    fleetName: string,
    managedNamespaceName: string,
    properties: FleetManagedNamespacePatch,
    options?: FleetManagedNamespacesUpdateOptionalParams,
  ) => PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace>;
  /** List FleetManagedNamespace resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetManagedNamespacesListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<FleetManagedNamespace>;
  /** Delete a FleetManagedNamespace */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    managedNamespaceName: string,
    options?: FleetManagedNamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a FleetManagedNamespace */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    managedNamespaceName: string,
    resource: FleetManagedNamespace,
    options?: FleetManagedNamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace>;
  /** Get a FleetManagedNamespace */
  get: (
    resourceGroupName: string,
    fleetName: string,
    managedNamespaceName: string,
    options?: FleetManagedNamespacesGetOptionalParams,
  ) => Promise<FleetManagedNamespace>;
}

function _getFleetManagedNamespaces(context: ContainerServiceFleetContext) {
  return {
    update: (
      resourceGroupName: string,
      fleetName: string,
      managedNamespaceName: string,
      properties: FleetManagedNamespacePatch,
      options?: FleetManagedNamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, fleetName, managedNamespaceName, properties, options),
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetManagedNamespacesListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      managedNamespaceName: string,
      options?: FleetManagedNamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, managedNamespaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      managedNamespaceName: string,
      resource: FleetManagedNamespace,
      options?: FleetManagedNamespacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        fleetName,
        managedNamespaceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      managedNamespaceName: string,
      options?: FleetManagedNamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, managedNamespaceName, options),
  };
}

export function _getFleetManagedNamespacesOperations(
  context: ContainerServiceFleetContext,
): FleetManagedNamespacesOperations {
  return {
    ..._getFleetManagedNamespaces(context),
  };
}
