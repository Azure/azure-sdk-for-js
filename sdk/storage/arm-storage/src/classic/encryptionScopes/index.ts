// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, patch, put, get } from "../../api/encryptionScopes/operations.js";
import {
  EncryptionScopesListOptionalParams,
  EncryptionScopesPatchOptionalParams,
  EncryptionScopesPutOptionalParams,
  EncryptionScopesGetOptionalParams,
} from "../../api/encryptionScopes/options.js";
import { EncryptionScope } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EncryptionScopes operations. */
export interface EncryptionScopesOperations {
  /** Lists all the encryption scopes available under the specified storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
  ) => PagedAsyncIterableIterator<EncryptionScope>;
  /** Update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist. */
  patch: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    encryptionScope: EncryptionScope,
    options?: EncryptionScopesPatchOptionalParams,
  ) => Promise<EncryptionScope>;
  /** Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request. */
  put: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    encryptionScope: EncryptionScope,
    options?: EncryptionScopesPutOptionalParams,
  ) => Promise<EncryptionScope>;
  /** Returns the properties for the specified encryption scope. */
  get: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesGetOptionalParams,
  ) => Promise<EncryptionScope>;
}

function _getEncryptionScopes(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: EncryptionScopesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    patch: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      encryptionScope: EncryptionScope,
      options?: EncryptionScopesPatchOptionalParams,
    ) =>
      patch(context, resourceGroupName, accountName, encryptionScopeName, encryptionScope, options),
    put: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      encryptionScope: EncryptionScope,
      options?: EncryptionScopesPutOptionalParams,
    ) =>
      put(context, resourceGroupName, accountName, encryptionScopeName, encryptionScope, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      options?: EncryptionScopesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, encryptionScopeName, options),
  };
}

export function _getEncryptionScopesOperations(
  context: StorageManagementContext,
): EncryptionScopesOperations {
  return {
    ..._getEncryptionScopes(context),
  };
}
