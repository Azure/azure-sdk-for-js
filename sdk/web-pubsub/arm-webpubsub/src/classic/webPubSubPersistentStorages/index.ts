// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/webPubSubPersistentStorages/operations.js";
import type {
  WebPubSubPersistentStoragesListOptionalParams,
  WebPubSubPersistentStoragesDeleteOptionalParams,
  WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
  WebPubSubPersistentStoragesGetOptionalParams,
} from "../../api/webPubSubPersistentStorages/options.js";
import type { PersistentStorage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubPersistentStorages operations. */
export interface WebPubSubPersistentStoragesOperations {
  /** List all persistent storages. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPersistentStoragesListOptionalParams,
  ) => PagedAsyncIterableIterator<PersistentStorage>;
  /** Delete a persistent storage. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubPersistentStoragesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubPersistentStoragesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubPersistentStoragesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a persistent storage. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: PersistentStorage,
    options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PersistentStorage>, PersistentStorage>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: PersistentStorage,
    options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PersistentStorage>, PersistentStorage>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    parameters: PersistentStorage,
    options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
  ) => Promise<PersistentStorage>;
  /** Get a persistent storage. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: WebPubSubPersistentStoragesGetOptionalParams,
  ) => Promise<PersistentStorage>;
}

function _getWebPubSubPersistentStorages(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPersistentStoragesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubPersistentStoragesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubPersistentStoragesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubPersistentStoragesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: PersistentStorage,
      options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, name, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: PersistentStorage,
      options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        name,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      parameters: PersistentStorage,
      options?: WebPubSubPersistentStoragesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        name,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: WebPubSubPersistentStoragesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, name, options),
  };
}

export function _getWebPubSubPersistentStoragesOperations(
  context: WebPubSubManagementContext,
): WebPubSubPersistentStoragesOperations {
  return {
    ..._getWebPubSubPersistentStorages(context),
  };
}
