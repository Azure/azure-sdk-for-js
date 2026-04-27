// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  switchProtection,
  switchClusterProtection,
  $delete,
  discoverProtectableItem,
  listByReplicationFabrics,
  create,
  get,
} from "../../api/replicationProtectionContainers/operations.js";
import type {
  ReplicationProtectionContainersListOptionalParams,
  ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ReplicationProtectionContainersDeleteOptionalParams,
  ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ReplicationProtectionContainersCreateOptionalParams,
  ReplicationProtectionContainersGetOptionalParams,
} from "../../api/replicationProtectionContainers/options.js";
import type {
  ProtectionContainer,
  CreateProtectionContainerInput,
  DiscoverProtectableItemRequest,
  SwitchClusterProtectionInput,
  SwitchProtectionInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationProtectionContainers operations. */
export interface ReplicationProtectionContainersOperations {
  /** Lists the protection containers in a vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainer>;
  /** Operation to switch protection from one container to another or one replication provider to another. */
  switchProtection: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchProtectionInput,
    options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
  /** @deprecated use switchProtection instead */
  beginSwitchProtection: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchProtectionInput,
    options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProtectionContainer>, ProtectionContainer>>;
  /** @deprecated use switchProtection instead */
  beginSwitchProtectionAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchProtectionInput,
    options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ) => Promise<ProtectionContainer>;
  /** Operation to switch protection from one container to another. */
  switchClusterProtection: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchClusterProtectionInput,
    options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
  /** @deprecated use switchClusterProtection instead */
  beginSwitchClusterProtection: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchClusterProtectionInput,
    options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProtectionContainer>, ProtectionContainer>>;
  /** @deprecated use switchClusterProtection instead */
  beginSwitchClusterProtectionAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchClusterProtectionInput,
    options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ) => Promise<ProtectionContainer>;
  /** Operation to remove a protection container. */
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
    options?: ReplicationProtectionContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to a add a protectable item to a protection container(Add physical server). */
  discoverProtectableItem: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    discoverProtectableItemRequest: DiscoverProtectableItemRequest,
    options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
  /** @deprecated use discoverProtectableItem instead */
  beginDiscoverProtectableItem: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    discoverProtectableItemRequest: DiscoverProtectableItemRequest,
    options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProtectionContainer>, ProtectionContainer>>;
  /** @deprecated use discoverProtectableItem instead */
  beginDiscoverProtectableItemAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    discoverProtectableItemRequest: DiscoverProtectableItemRequest,
    options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ) => Promise<ProtectionContainer>;
  /** Lists the protection containers in the specified fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainer>;
  /** Operation to create a protection container. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    creationInput: CreateProtectionContainerInput,
    options?: ReplicationProtectionContainersCreateOptionalParams,
  ) => PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    creationInput: CreateProtectionContainerInput,
    options?: ReplicationProtectionContainersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProtectionContainer>, ProtectionContainer>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    creationInput: CreateProtectionContainerInput,
    options?: ReplicationProtectionContainersCreateOptionalParams,
  ) => Promise<ProtectionContainer>;
  /** Gets the details of a protection container. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersGetOptionalParams,
  ) => Promise<ProtectionContainer>;
}

function _getReplicationProtectionContainers(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationProtectionContainersListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    switchProtection: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchProtectionInput,
      options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
    ) =>
      switchProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      ),
    beginSwitchProtection: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchProtectionInput,
      options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
    ) => {
      const poller = switchProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwitchProtectionAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchProtectionInput,
      options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
    ) => {
      return await switchProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      );
    },
    switchClusterProtection: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchClusterProtectionInput,
      options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
    ) =>
      switchClusterProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      ),
    beginSwitchClusterProtection: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchClusterProtectionInput,
      options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
    ) => {
      const poller = switchClusterProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwitchClusterProtectionAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      switchInput: SwitchClusterProtectionInput,
      options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
    ) => {
      return await switchClusterProtection(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectionContainersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectionContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
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
      options?: ReplicationProtectionContainersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      );
    },
    discoverProtectableItem: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      discoverProtectableItemRequest: DiscoverProtectableItemRequest,
      options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
    ) =>
      discoverProtectableItem(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        discoverProtectableItemRequest,
        options,
      ),
    beginDiscoverProtectableItem: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      discoverProtectableItemRequest: DiscoverProtectableItemRequest,
      options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
    ) => {
      const poller = discoverProtectableItem(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        discoverProtectableItemRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDiscoverProtectableItemAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      discoverProtectableItemRequest: DiscoverProtectableItemRequest,
      options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
    ) => {
      return await discoverProtectableItem(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        discoverProtectableItemRequest,
        options,
      );
    },
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      creationInput: CreateProtectionContainerInput,
      options?: ReplicationProtectionContainersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        creationInput,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      creationInput: CreateProtectionContainerInput,
      options?: ReplicationProtectionContainersCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
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
      creationInput: CreateProtectionContainerInput,
      options?: ReplicationProtectionContainersCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        creationInput,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectionContainersGetOptionalParams,
    ) =>
      get(context, resourceGroupName, resourceName, fabricName, protectionContainerName, options),
  };
}

export function _getReplicationProtectionContainersOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectionContainersOperations {
  return {
    ..._getReplicationProtectionContainers(context),
  };
}
