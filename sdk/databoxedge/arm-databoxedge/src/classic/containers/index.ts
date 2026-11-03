// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  refresh,
  listByStorageAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/containers/operations.js";
import type {
  ContainersRefreshOptionalParams,
  ContainersListByStorageAccountOptionalParams,
  ContainersDeleteOptionalParams,
  ContainersCreateOrUpdateOptionalParams,
  ContainersGetOptionalParams,
} from "../../api/containers/options.js";
import type { Container } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Containers operations. */
export interface ContainersOperations {
  /** Refreshes the container metadata with the data from the cloud. */
  refresh: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersRefreshOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refresh instead */
  beginRefresh: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersRefreshOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refresh instead */
  beginRefreshAndWait: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersRefreshOptionalParams,
  ) => Promise<void>;
  /** Lists all the containers of a storage Account in a Data Box Edge/Data Box Gateway device. */
  listByStorageAccount: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: ContainersListByStorageAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Container>;
  /** Deletes the container on the Data Box Edge/Data Box Gateway device. */
  delete: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new container or updates an existing container on the device. */
  createOrUpdate: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    container: Container,
    options?: ContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Container>, Container>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    container: Container,
    options?: ContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Container>, Container>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    container: Container,
    options?: ContainersCreateOrUpdateOptionalParams,
  ) => Promise<Container>;
  /** Gets a container by name. */
  get: (
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersGetOptionalParams,
  ) => Promise<Container>;
}

function _getContainers(context: DataBoxEdgeManagementContext) {
  return {
    refresh: (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersRefreshOptionalParams,
    ) =>
      refresh(context, deviceName, storageAccountName, containerName, resourceGroupName, options),
    beginRefresh: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersRefreshOptionalParams,
    ) => {
      const poller = refresh(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAndWait: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersRefreshOptionalParams,
    ) => {
      return await refresh(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      );
    },
    listByStorageAccount: (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      options?: ContainersListByStorageAccountOptionalParams,
    ) => listByStorageAccount(context, deviceName, storageAccountName, resourceGroupName, options),
    delete: (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersDeleteOptionalParams,
    ) =>
      $delete(context, deviceName, storageAccountName, containerName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options,
      );
    },
    createOrUpdate: (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      container: Container,
      options?: ContainersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        container,
        options,
      ),
    beginCreateOrUpdate: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      container: Container,
      options?: ContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        container,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      container: Container,
      options?: ContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        container,
        options,
      );
    },
    get: (
      deviceName: string,
      storageAccountName: string,
      containerName: string,
      resourceGroupName: string,
      options?: ContainersGetOptionalParams,
    ) => get(context, deviceName, storageAccountName, containerName, resourceGroupName, options),
  };
}

export function _getContainersOperations(
  context: DataBoxEdgeManagementContext,
): ContainersOperations {
  return {
    ..._getContainers(context),
  };
}
