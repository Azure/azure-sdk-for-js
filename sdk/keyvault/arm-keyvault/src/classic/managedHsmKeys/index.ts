// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  listVersions,
  getVersion,
  list,
  createIfNotExist,
  get,
} from "../../api/managedHsmKeys/operations.js";
import type {
  ManagedHsmKeysListVersionsOptionalParams,
  ManagedHsmKeysGetVersionOptionalParams,
  ManagedHsmKeysListOptionalParams,
  ManagedHsmKeysCreateIfNotExistOptionalParams,
  ManagedHsmKeysGetOptionalParams,
} from "../../api/managedHsmKeys/options.js";
import type { ManagedHsmKey, ManagedHsmKeyCreateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedHsmKeys operations. */
export interface ManagedHsmKeysOperations {
  /** Lists the keys in the specified managed HSM. */
  listVersions: (
    resourceGroupName: string,
    name: string,
    keyName: string,
    options?: ManagedHsmKeysListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedHsmKey>;
  /** Gets the specified version of the specified key in the specified managed HSM. */
  getVersion: (
    resourceGroupName: string,
    name: string,
    keyName: string,
    keyVersion: string,
    options?: ManagedHsmKeysGetVersionOptionalParams,
  ) => Promise<ManagedHsmKey>;
  /** Lists the keys in the specified managed HSM. */
  list: (
    resourceGroupName: string,
    name: string,
    options?: ManagedHsmKeysListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedHsmKey>;
  /** Creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. */
  createIfNotExist: (
    resourceGroupName: string,
    name: string,
    keyName: string,
    parameters: ManagedHsmKeyCreateParameters,
    options?: ManagedHsmKeysCreateIfNotExistOptionalParams,
  ) => Promise<ManagedHsmKey>;
  /** Gets the current version of the specified key from the specified managed HSM. */
  get: (
    resourceGroupName: string,
    name: string,
    keyName: string,
    options?: ManagedHsmKeysGetOptionalParams,
  ) => Promise<ManagedHsmKey>;
}

function _getManagedHsmKeys(context: KeyVaultManagementContext) {
  return {
    listVersions: (
      resourceGroupName: string,
      name: string,
      keyName: string,
      options?: ManagedHsmKeysListVersionsOptionalParams,
    ) => listVersions(context, resourceGroupName, name, keyName, options),
    getVersion: (
      resourceGroupName: string,
      name: string,
      keyName: string,
      keyVersion: string,
      options?: ManagedHsmKeysGetVersionOptionalParams,
    ) => getVersion(context, resourceGroupName, name, keyName, keyVersion, options),
    list: (resourceGroupName: string, name: string, options?: ManagedHsmKeysListOptionalParams) =>
      list(context, resourceGroupName, name, options),
    createIfNotExist: (
      resourceGroupName: string,
      name: string,
      keyName: string,
      parameters: ManagedHsmKeyCreateParameters,
      options?: ManagedHsmKeysCreateIfNotExistOptionalParams,
    ) => createIfNotExist(context, resourceGroupName, name, keyName, parameters, options),
    get: (
      resourceGroupName: string,
      name: string,
      keyName: string,
      options?: ManagedHsmKeysGetOptionalParams,
    ) => get(context, resourceGroupName, name, keyName, options),
  };
}

export function _getManagedHsmKeysOperations(
  context: KeyVaultManagementContext,
): ManagedHsmKeysOperations {
  return {
    ..._getManagedHsmKeys(context),
  };
}
