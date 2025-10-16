// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  listVersions,
  getVersion,
  list,
  createIfNotExist,
  get,
} from "../../api/keys/operations.js";
import type {
  KeysListVersionsOptionalParams,
  KeysGetVersionOptionalParams,
  KeysListOptionalParams,
  KeysCreateIfNotExistOptionalParams,
  KeysGetOptionalParams,
} from "../../api/keys/options.js";
import type { Key, KeyCreateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Keys operations. */
export interface KeysOperations {
  /** Lists the keys in the specified key vault. */
  listVersions: (
    resourceGroupName: string,
    vaultName: string,
    keyName: string,
    options?: KeysListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<Key>;
  /** Gets the specified version of the specified key in the specified key vault. */
  getVersion: (
    resourceGroupName: string,
    vaultName: string,
    keyName: string,
    keyVersion: string,
    options?: KeysGetVersionOptionalParams,
  ) => Promise<Key>;
  /** Lists the keys in the specified key vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: KeysListOptionalParams,
  ) => PagedAsyncIterableIterator<Key>;
  /** Creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. */
  createIfNotExist: (
    resourceGroupName: string,
    vaultName: string,
    keyName: string,
    parameters: KeyCreateParameters,
    options?: KeysCreateIfNotExistOptionalParams,
  ) => Promise<Key>;
  /** Gets the current version of the specified key from the specified key vault. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    keyName: string,
    options?: KeysGetOptionalParams,
  ) => Promise<Key>;
}

function _getKeys(context: KeyVaultManagementContext) {
  return {
    listVersions: (
      resourceGroupName: string,
      vaultName: string,
      keyName: string,
      options?: KeysListVersionsOptionalParams,
    ) => listVersions(context, resourceGroupName, vaultName, keyName, options),
    getVersion: (
      resourceGroupName: string,
      vaultName: string,
      keyName: string,
      keyVersion: string,
      options?: KeysGetVersionOptionalParams,
    ) => getVersion(context, resourceGroupName, vaultName, keyName, keyVersion, options),
    list: (resourceGroupName: string, vaultName: string, options?: KeysListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    createIfNotExist: (
      resourceGroupName: string,
      vaultName: string,
      keyName: string,
      parameters: KeyCreateParameters,
      options?: KeysCreateIfNotExistOptionalParams,
    ) => createIfNotExist(context, resourceGroupName, vaultName, keyName, parameters, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      keyName: string,
      options?: KeysGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, keyName, options),
  };
}

export function _getKeysOperations(context: KeyVaultManagementContext): KeysOperations {
  return {
    ..._getKeys(context),
  };
}
