// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/managedDatabaseTransparentDataEncryption/operations.js";
import type {
  ManagedDatabaseTransparentDataEncryptionListByDatabaseOptionalParams,
  ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOptionalParams,
  ManagedDatabaseTransparentDataEncryptionGetOptionalParams,
} from "../../api/managedDatabaseTransparentDataEncryption/options.js";
import type {
  ManagedTransparentDataEncryption,
  TransparentDataEncryptionName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseTransparentDataEncryption operations. */
export interface ManagedDatabaseTransparentDataEncryptionOperations {
  /** Gets a list of managed database's transparent data encryptions. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseTransparentDataEncryptionListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedTransparentDataEncryption>;
  /** Updates a database's transparent data encryption configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    parameters: ManagedTransparentDataEncryption,
    options?: ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOptionalParams,
  ) => Promise<ManagedTransparentDataEncryption>;
  /** Gets a managed database's transparent data encryption. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    tdeName: TransparentDataEncryptionName,
    options?: ManagedDatabaseTransparentDataEncryptionGetOptionalParams,
  ) => Promise<ManagedTransparentDataEncryption>;
}

function _getManagedDatabaseTransparentDataEncryption(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseTransparentDataEncryptionListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      parameters: ManagedTransparentDataEncryption,
      options?: ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        tdeName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      tdeName: TransparentDataEncryptionName,
      options?: ManagedDatabaseTransparentDataEncryptionGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, tdeName, options),
  };
}

export function _getManagedDatabaseTransparentDataEncryptionOperations(
  context: SqlManagementContext,
): ManagedDatabaseTransparentDataEncryptionOperations {
  return {
    ..._getManagedDatabaseTransparentDataEncryption(context),
  };
}
