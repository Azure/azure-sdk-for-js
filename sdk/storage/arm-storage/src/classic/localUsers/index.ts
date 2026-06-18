// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  regeneratePassword,
  listKeys,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/localUsers/operations.js";
import {
  LocalUsersRegeneratePasswordOptionalParams,
  LocalUsersListKeysOptionalParams,
  LocalUsersListOptionalParams,
  LocalUsersDeleteOptionalParams,
  LocalUsersCreateOrUpdateOptionalParams,
  LocalUsersGetOptionalParams,
} from "../../api/localUsers/options.js";
import {
  LocalUser,
  LocalUserKeys,
  LocalUserRegeneratePasswordResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LocalUsers operations. */
export interface LocalUsersOperations {
  /** Regenerate the local user SSH password. */
  regeneratePassword: (
    resourceGroupName: string,
    accountName: string,
    username: string,
    options?: LocalUsersRegeneratePasswordOptionalParams,
  ) => Promise<LocalUserRegeneratePasswordResult>;
  /** List SSH authorized keys and shared key of the local user. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    username: string,
    options?: LocalUsersListKeysOptionalParams,
  ) => Promise<LocalUserKeys>;
  /** List the local users associated with the storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: LocalUsersListOptionalParams,
  ) => PagedAsyncIterableIterator<LocalUser>;
  /** Deletes the local user associated with the specified storage account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    username: string,
    options?: LocalUsersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the properties of a local user associated with the storage account. Properties for NFSv3 enablement and extended groups cannot be set with other properties. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    username: string,
    properties: LocalUser,
    options?: LocalUsersCreateOrUpdateOptionalParams,
  ) => Promise<LocalUser>;
  /** Get the local user of the storage account by username. */
  get: (
    resourceGroupName: string,
    accountName: string,
    username: string,
    options?: LocalUsersGetOptionalParams,
  ) => Promise<LocalUser>;
}

function _getLocalUsers(context: StorageManagementContext) {
  return {
    regeneratePassword: (
      resourceGroupName: string,
      accountName: string,
      username: string,
      options?: LocalUsersRegeneratePasswordOptionalParams,
    ) => regeneratePassword(context, resourceGroupName, accountName, username, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      username: string,
      options?: LocalUsersListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, username, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: LocalUsersListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      username: string,
      options?: LocalUsersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, username, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      username: string,
      properties: LocalUser,
      options?: LocalUsersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, username, properties, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      username: string,
      options?: LocalUsersGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, username, options),
  };
}

export function _getLocalUsersOperations(context: StorageManagementContext): LocalUsersOperations {
  return {
    ..._getLocalUsers(context),
  };
}
