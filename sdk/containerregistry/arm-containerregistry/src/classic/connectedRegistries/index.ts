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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use deactivate instead */
  beginDeactivate: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeactivateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deactivate instead */
  beginDeactivateAndWait: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeactivateOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    options?: ConnectedRegistriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a connected registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
    options?: ConnectedRegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
    options?: ConnectedRegistriesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
    options?: ConnectedRegistriesUpdateOptionalParams,
  ) => Promise<ConnectedRegistry>;
  /** Creates a connected registry for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryCreateParameters: ConnectedRegistry,
    options?: ConnectedRegistriesCreateOptionalParams,
  ) => PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryCreateParameters: ConnectedRegistry,
    options?: ConnectedRegistriesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    connectedRegistryName: string,
    connectedRegistryCreateParameters: ConnectedRegistry,
    options?: ConnectedRegistriesCreateOptionalParams,
  ) => Promise<ConnectedRegistry>;
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
    beginDeactivate: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeactivateOptionalParams,
    ) => {
      const poller = deactivate(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeactivateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeactivateOptionalParams,
    ) => {
      return await deactivate(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      options?: ConnectedRegistriesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
      options?: ConnectedRegistriesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
      options?: ConnectedRegistriesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryUpdateParameters,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryCreateParameters: ConnectedRegistry,
      options?: ConnectedRegistriesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryCreateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      connectedRegistryName: string,
      connectedRegistryCreateParameters: ConnectedRegistry,
      options?: ConnectedRegistriesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryCreateParameters,
        options,
      );
    },
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
