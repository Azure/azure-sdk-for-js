// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import {
  deactivate,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/connectedRegistries/operations.js";
import type {
  ConnectedRegistriesDeactivateOptionalParams,
  ConnectedRegistriesListOptionalParams,
  ConnectedRegistriesDeleteOptionalParams,
  ConnectedRegistriesUpdateOptionalParams,
  ConnectedRegistriesCreateOptionalParams,
  ConnectedRegistriesGetOptionalParams,
} from "../../api/connectedRegistries/options.js";
import type { ConnectedRegistry, ConnectedRegistryUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedRegistries operations. */
export interface ConnectedRegistriesOperations {
  /** Deactivates the connected registry instance. */
  deactivate: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeactivateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all connected registries for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: ConnectedRegistriesListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedRegistry>;
  /** Deletes a connected registry from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a connected registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
    options?: ConnectedRegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
  /** Creates a connected registry for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryCreateParameters: ConnectedRegistry,
    options?: ConnectedRegistriesCreateOptionalParams,
  ) => PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
  /** Gets the properties of the connected registry. */
  get: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesGetOptionalParams,
  ) => Promise<ConnectedRegistry>;
}

function _getConnectedRegistries(context: ContainerRegistryManagementContext) {
  return {
    deactivate: (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeactivateOptionalParams,
    ) => deactivate(context, resourceGroupName, registryName, connectedRegistryName, options),
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: ConnectedRegistriesListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, connectedRegistryName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
      options?: ConnectedRegistriesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryCreateParameters: ConnectedRegistry,
      options?: ConnectedRegistriesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, connectedRegistryName, options),
  };
}

export function _getConnectedRegistriesOperations(
  context: ContainerRegistryManagementContext,
): ConnectedRegistriesOperations {
  return {
    ..._getConnectedRegistries(context),
  };
}
