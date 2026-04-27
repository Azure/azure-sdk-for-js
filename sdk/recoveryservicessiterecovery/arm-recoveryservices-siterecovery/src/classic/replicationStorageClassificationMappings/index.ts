// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  listByReplicationStorageClassifications,
  $delete,
  create,
  get,
} from "../../api/replicationStorageClassificationMappings/operations.js";
import type {
  ReplicationStorageClassificationMappingsListOptionalParams,
  ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams,
  ReplicationStorageClassificationMappingsDeleteOptionalParams,
  ReplicationStorageClassificationMappingsCreateOptionalParams,
  ReplicationStorageClassificationMappingsGetOptionalParams,
} from "../../api/replicationStorageClassificationMappings/options.js";
import type {
  StorageClassificationMapping,
  StorageClassificationMappingInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationStorageClassificationMappings operations. */
export interface ReplicationStorageClassificationMappingsOperations {
  /** Lists the storage classification mappings in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationStorageClassificationMappingsListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassificationMapping>;
  /** Lists the storage classification mappings for the fabric. */
  listByReplicationStorageClassifications: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    options?: ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassificationMapping>;
  /** The operation to delete a storage classification mapping. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create a storage classification mapping. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    pairingInput: StorageClassificationMappingInput,
    options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
  ) => PollerLike<OperationState<StorageClassificationMapping>, StorageClassificationMapping>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    pairingInput: StorageClassificationMappingInput,
    options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<StorageClassificationMapping>, StorageClassificationMapping>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    pairingInput: StorageClassificationMappingInput,
    options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
  ) => Promise<StorageClassificationMapping>;
  /** Gets the details of the specified storage classification mapping. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: ReplicationStorageClassificationMappingsGetOptionalParams,
  ) => Promise<StorageClassificationMapping>;
}

function _getReplicationStorageClassificationMappings(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationStorageClassificationMappingsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationStorageClassifications: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      options?: ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsOptionalParams,
    ) =>
      listByReplicationStorageClassifications(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      options?: ReplicationStorageClassificationMappingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      pairingInput: StorageClassificationMappingInput,
      options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        pairingInput,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      pairingInput: StorageClassificationMappingInput,
      options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        pairingInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      pairingInput: StorageClassificationMappingInput,
      options?: ReplicationStorageClassificationMappingsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        pairingInput,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      storageClassificationMappingName: string,
      options?: ReplicationStorageClassificationMappingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options,
      ),
  };
}

export function _getReplicationStorageClassificationMappingsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationStorageClassificationMappingsOperations {
  return {
    ..._getReplicationStorageClassificationMappings(context),
  };
}
