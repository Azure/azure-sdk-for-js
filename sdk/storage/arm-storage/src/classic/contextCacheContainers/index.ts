// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  listByContextCache,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/contextCacheContainers/operations.js";
import type {
  ContextCacheContainersListByContextCacheOptionalParams,
  ContextCacheContainersDeleteOptionalParams,
  ContextCacheContainersUpdateOptionalParams,
  ContextCacheContainersCreateOrUpdateOptionalParams,
  ContextCacheContainersGetOptionalParams,
} from "../../api/contextCacheContainers/options.js";
import type { ContextCacheContainer, ContextCacheContainerUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContextCacheContainers operations. */
export interface ContextCacheContainersOperations {
  /** List all containers in a Context Cache. */
  listByContextCache: (
    resourceGroupName: string,
    contextCacheName: string,
    options?: ContextCacheContainersListByContextCacheOptionalParams,
  ) => PagedAsyncIterableIterator<ContextCacheContainer>;
  /** Delete a container from a Context Cache. */
  delete: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    options?: ContextCacheContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    options?: ContextCacheContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    options?: ContextCacheContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a container in a Context Cache. */
  update: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    properties: ContextCacheContainerUpdate,
    options?: ContextCacheContainersUpdateOptionalParams,
  ) => PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    properties: ContextCacheContainerUpdate,
    options?: ContextCacheContainersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    properties: ContextCacheContainerUpdate,
    options?: ContextCacheContainersUpdateOptionalParams,
  ) => Promise<ContextCacheContainer>;
  /** Create or update a container in a Context Cache. */
  createOrUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    resource: ContextCacheContainer,
    options?: ContextCacheContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    resource: ContextCacheContainer,
    options?: ContextCacheContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContextCacheContainer>, ContextCacheContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    resource: ContextCacheContainer,
    options?: ContextCacheContainersCreateOrUpdateOptionalParams,
  ) => Promise<ContextCacheContainer>;
  /** Get a container in a Context Cache. */
  get: (
    resourceGroupName: string,
    contextCacheName: string,
    contextCacheContainerName: string,
    options?: ContextCacheContainersGetOptionalParams,
  ) => Promise<ContextCacheContainer>;
}

function _getContextCacheContainers(context: StorageManagementContext) {
  return {
    listByContextCache: (
      resourceGroupName: string,
      contextCacheName: string,
      options?: ContextCacheContainersListByContextCacheOptionalParams,
    ) => listByContextCache(context, resourceGroupName, contextCacheName, options),
    delete: (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      options?: ContextCacheContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextCacheName, contextCacheContainerName, options),
    beginDelete: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      options?: ContextCacheContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      options?: ContextCacheContainersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      properties: ContextCacheContainerUpdate,
      options?: ContextCacheContainersUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        properties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      properties: ContextCacheContainerUpdate,
      options?: ContextCacheContainersUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      properties: ContextCacheContainerUpdate,
      options?: ContextCacheContainersUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      resource: ContextCacheContainer,
      options?: ContextCacheContainersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      resource: ContextCacheContainer,
      options?: ContextCacheContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      resource: ContextCacheContainer,
      options?: ContextCacheContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        contextCacheName,
        contextCacheContainerName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      contextCacheName: string,
      contextCacheContainerName: string,
      options?: ContextCacheContainersGetOptionalParams,
    ) => get(context, resourceGroupName, contextCacheName, contextCacheContainerName, options),
  };
}

export function _getContextCacheContainersOperations(
  context: StorageManagementContext,
): ContextCacheContainersOperations {
  return {
    ..._getContextCacheContainers(context),
  };
}
