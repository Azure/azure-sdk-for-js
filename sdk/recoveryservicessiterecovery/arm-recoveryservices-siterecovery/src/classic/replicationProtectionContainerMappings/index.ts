// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  $delete,
  listByReplicationProtectionContainers,
  purge,
  update,
  create,
  get,
} from "../../api/replicationProtectionContainerMappings/operations.js";
import type {
  ReplicationProtectionContainerMappingsListOptionalParams,
  ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ReplicationProtectionContainerMappingsCreateOptionalParams,
  ReplicationProtectionContainerMappingsGetOptionalParams,
} from "../../api/replicationProtectionContainerMappings/options.js";
import type {
  ProtectionContainerMapping,
  CreateProtectionContainerMappingInput,
  UpdateProtectionContainerMappingInput,
  RemoveProtectionContainerMappingInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationProtectionContainerMappings operations. */
export interface ReplicationProtectionContainerMappingsOperations {
  /** Lists the protection container mappings in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionContainerMappingsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainerMapping>;
  /** The operation to delete or remove a protection container mapping. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    removalInput: RemoveProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    removalInput: RemoveProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    removalInput: RemoveProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Lists the protection container mappings for a protection container. */
  listByReplicationProtectionContainers: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainerMapping>;
  /** The operation to purge(force delete) a protection container mapping. */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ) => Promise<void>;
  /** The operation to update protection container mapping. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    updateInput: UpdateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    updateInput: UpdateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    updateInput: UpdateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ) => Promise<ProtectionContainerMapping>;
  /** The operation to create a protection container mapping. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    creationInput: CreateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    creationInput: CreateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    creationInput: CreateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
  ) => Promise<ProtectionContainerMapping>;
  /** Gets the details of a protection container mapping. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsGetOptionalParams,
  ) => Promise<ProtectionContainerMapping>;
}

function _getReplicationProtectionContainerMappings(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationProtectionContainerMappingsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      removalInput: RemoveProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        removalInput,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      removalInput: RemoveProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        removalInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      removalInput: RemoveProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        removalInput,
        options,
      );
    },
    listByReplicationProtectionContainers: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
    ) =>
      listByReplicationProtectionContainers(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    purge: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
    ) =>
      purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        options,
      ),
    beginPurge: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
    ) => {
      return await purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      updateInput: UpdateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        updateInput,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      updateInput: UpdateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        updateInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      updateInput: UpdateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        updateInput,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      creationInput: CreateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        creationInput,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      creationInput: CreateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        creationInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      creationInput: CreateProtectionContainerMappingInput,
      options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        creationInput,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      mappingName: string,
      options?: ReplicationProtectionContainerMappingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        options,
      ),
  };
}

export function _getReplicationProtectionContainerMappingsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectionContainerMappingsOperations {
  return {
    ..._getReplicationProtectionContainerMappings(context),
  };
}
