// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedEnvironmentsStorages/operations.js";
import {
  ManagedEnvironmentsStoragesListOptionalParams,
  ManagedEnvironmentsStoragesDeleteOptionalParams,
  ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ManagedEnvironmentsStoragesGetOptionalParams,
} from "../../api/managedEnvironmentsStorages/options.js";
import {
  ManagedEnvironmentStorage,
  ManagedEnvironmentStoragesCollection,
} from "../../models/models.js";

/** Interface representing a ManagedEnvironmentsStorages operations. */
export interface ManagedEnvironmentsStoragesOperations {
  /** Get all storages for a managedEnvironment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsStoragesListOptionalParams,
  ) => Promise<ManagedEnvironmentStoragesCollection>;
  /** Delete storage for a managedEnvironment. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    storageName: string,
    options?: ManagedEnvironmentsStoragesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update storage for a managedEnvironment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    storageName: string,
    storageEnvelope: ManagedEnvironmentStorage,
    options?: ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedEnvironmentStorage>;
  /** Get storage for a managedEnvironment. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    storageName: string,
    options?: ManagedEnvironmentsStoragesGetOptionalParams,
  ) => Promise<ManagedEnvironmentStorage>;
}

function _getManagedEnvironmentsStorages(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsStoragesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      storageName: string,
      options?: ManagedEnvironmentsStoragesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, storageName, options),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      storageName: string,
      storageEnvelope: ManagedEnvironmentStorage,
      options?: ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        storageName,
        storageEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      environmentName: string,
      storageName: string,
      options?: ManagedEnvironmentsStoragesGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, storageName, options),
  };
}

export function _getManagedEnvironmentsStoragesOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentsStoragesOperations {
  return {
    ..._getManagedEnvironmentsStorages(context),
  };
}
