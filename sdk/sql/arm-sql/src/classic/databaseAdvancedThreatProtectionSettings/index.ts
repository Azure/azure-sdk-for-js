// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/databaseAdvancedThreatProtectionSettings/operations.js";
import type {
  DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/databaseAdvancedThreatProtectionSettings/options.js";
import type {
  DatabaseAdvancedThreatProtection,
  AdvancedThreatProtectionName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseAdvancedThreatProtectionSettings operations. */
export interface DatabaseAdvancedThreatProtectionSettingsOperations {
  /** Gets a list of database's Advanced Threat Protection states. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseAdvancedThreatProtection>;
  /** Creates or updates a database's Advanced Threat Protection state. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: DatabaseAdvancedThreatProtection,
    options?: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseAdvancedThreatProtection>;
  /** Gets a database's Advanced Threat Protection state. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: DatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<DatabaseAdvancedThreatProtection>;
}

function _getDatabaseAdvancedThreatProtectionSettings(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: DatabaseAdvancedThreatProtection,
      options?: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      options?: DatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advancedThreatProtectionName,
        options,
      ),
  };
}

export function _getDatabaseAdvancedThreatProtectionSettingsOperations(
  context: SqlContext,
): DatabaseAdvancedThreatProtectionSettingsOperations {
  return {
    ..._getDatabaseAdvancedThreatProtectionSettings(context),
  };
}
