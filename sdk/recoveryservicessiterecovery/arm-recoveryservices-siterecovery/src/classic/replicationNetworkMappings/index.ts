// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  listByReplicationNetworks,
  $delete,
  update,
  create,
  get,
} from "../../api/replicationNetworkMappings/operations.js";
import type {
  ReplicationNetworkMappingsListOptionalParams,
  ReplicationNetworkMappingsListByReplicationNetworksOptionalParams,
  ReplicationNetworkMappingsDeleteOptionalParams,
  ReplicationNetworkMappingsUpdateOptionalParams,
  ReplicationNetworkMappingsCreateOptionalParams,
  ReplicationNetworkMappingsGetOptionalParams,
} from "../../api/replicationNetworkMappings/options.js";
import type {
  NetworkMapping,
  CreateNetworkMappingInput,
  UpdateNetworkMappingInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationNetworkMappings operations. */
export interface ReplicationNetworkMappingsOperations {
  /** Lists all ASR network mappings in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationNetworkMappingsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkMapping>;
  /** Lists all ASR network mappings for the specified network. */
  listByReplicationNetworks: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    options?: ReplicationNetworkMappingsListByReplicationNetworksOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkMapping>;
  /** The operation to delete a network mapping. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    options?: ReplicationNetworkMappingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    options?: ReplicationNetworkMappingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    options?: ReplicationNetworkMappingsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update an ASR network mapping. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: UpdateNetworkMappingInput,
    options?: ReplicationNetworkMappingsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkMapping>, NetworkMapping>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: UpdateNetworkMappingInput,
    options?: ReplicationNetworkMappingsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkMapping>, NetworkMapping>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: UpdateNetworkMappingInput,
    options?: ReplicationNetworkMappingsUpdateOptionalParams,
  ) => Promise<NetworkMapping>;
  /** The operation to create an ASR network mapping. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: CreateNetworkMappingInput,
    options?: ReplicationNetworkMappingsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkMapping>, NetworkMapping>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: CreateNetworkMappingInput,
    options?: ReplicationNetworkMappingsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkMapping>, NetworkMapping>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    input: CreateNetworkMappingInput,
    options?: ReplicationNetworkMappingsCreateOptionalParams,
  ) => Promise<NetworkMapping>;
  /** Gets the details of an ASR network mapping. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    networkMappingName: string,
    options?: ReplicationNetworkMappingsGetOptionalParams,
  ) => Promise<NetworkMapping>;
}

function _getReplicationNetworkMappings(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationNetworkMappingsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationNetworks: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      options?: ReplicationNetworkMappingsListByReplicationNetworksOptionalParams,
    ) =>
      listByReplicationNetworks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      options?: ReplicationNetworkMappingsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      options?: ReplicationNetworkMappingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      options?: ReplicationNetworkMappingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: UpdateNetworkMappingInput,
      options?: ReplicationNetworkMappingsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: UpdateNetworkMappingInput,
      options?: ReplicationNetworkMappingsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: UpdateNetworkMappingInput,
      options?: ReplicationNetworkMappingsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: CreateNetworkMappingInput,
      options?: ReplicationNetworkMappingsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: CreateNetworkMappingInput,
      options?: ReplicationNetworkMappingsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      input: CreateNetworkMappingInput,
      options?: ReplicationNetworkMappingsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        input,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      networkMappingName: string,
      options?: ReplicationNetworkMappingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        networkName,
        networkMappingName,
        options,
      ),
  };
}

export function _getReplicationNetworkMappingsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationNetworkMappingsOperations {
  return {
    ..._getReplicationNetworkMappings(context),
  };
}
