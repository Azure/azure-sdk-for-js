// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectedEnvironmentsStorages/operations.js";
import {
  ConnectedEnvironmentsStoragesListOptionalParams,
  ConnectedEnvironmentsStoragesDeleteOptionalParams,
  ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsStoragesGetOptionalParams,
} from "../../api/connectedEnvironmentsStorages/options.js";
import {
  ConnectedEnvironmentStorage,
  ConnectedEnvironmentStoragesCollection,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedEnvironmentsStorages operations. */
export interface ConnectedEnvironmentsStoragesOperations {
  /** Get all storages for a connectedEnvironment. */
  list: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsStoragesListOptionalParams,
  ) => Promise<ConnectedEnvironmentStoragesCollection>;
  /** Delete storage for a connectedEnvironment. */
  delete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update storage for a connectedEnvironment. */
  createOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    storageEnvelope: ConnectedEnvironmentStorage,
    options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConnectedEnvironmentStorage>, ConnectedEnvironmentStorage>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    storageEnvelope: ConnectedEnvironmentStorage,
    options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ConnectedEnvironmentStorage>, ConnectedEnvironmentStorage>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    storageEnvelope: ConnectedEnvironmentStorage,
    options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ) => Promise<ConnectedEnvironmentStorage>;
  /** Get storage for a connectedEnvironment. */
  get: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    storageName: string,
    options?: ConnectedEnvironmentsStoragesGetOptionalParams,
  ) => Promise<ConnectedEnvironmentStorage>;
}

function _getConnectedEnvironmentsStorages(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsStoragesListOptionalParams,
    ) => list(context, resourceGroupName, connectedEnvironmentName, options),
    delete: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectedEnvironmentName, storageName, options),
    beginDelete: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      options?: ConnectedEnvironmentsStoragesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      storageEnvelope: ConnectedEnvironmentStorage,
      options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        storageEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      storageEnvelope: ConnectedEnvironmentStorage,
      options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        storageEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      storageEnvelope: ConnectedEnvironmentStorage,
      options?: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        storageEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      storageName: string,
      options?: ConnectedEnvironmentsStoragesGetOptionalParams,
    ) => get(context, resourceGroupName, connectedEnvironmentName, storageName, options),
  };
}

export function _getConnectedEnvironmentsStoragesOperations(
  context: ContainerAppsAPIContext,
): ConnectedEnvironmentsStoragesOperations {
  return {
    ..._getConnectedEnvironmentsStorages(context),
  };
}
