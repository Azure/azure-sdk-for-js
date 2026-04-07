// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/managedDatabaseAdvancedThreatProtectionSettings/operations.js";
import type {
  ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/managedDatabaseAdvancedThreatProtectionSettings/options.js";
import type {
  AdvancedThreatProtectionName,
  ManagedDatabaseAdvancedThreatProtection,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseAdvancedThreatProtectionSettings operations. */
export interface ManagedDatabaseAdvancedThreatProtectionSettingsOperations {
  /** Gets a list of managed database's Advanced Threat Protection states. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDatabaseAdvancedThreatProtection>;
  /** Creates or updates a managed database's Advanced Threat Protection state. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ManagedDatabaseAdvancedThreatProtection,
    options?: ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedDatabaseAdvancedThreatProtection>;
  /** Gets a managed database's Advanced Threat Protection state. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<ManagedDatabaseAdvancedThreatProtection>;
}

function _getManagedDatabaseAdvancedThreatProtectionSettings(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ManagedDatabaseAdvancedThreatProtection,
      options?: ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      options?: ManagedDatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        advancedThreatProtectionName,
        options,
      ),
  };
}

export function _getManagedDatabaseAdvancedThreatProtectionSettingsOperations(
  context: SqlContext,
): ManagedDatabaseAdvancedThreatProtectionSettingsOperations {
  return {
    ..._getManagedDatabaseAdvancedThreatProtectionSettings(context),
  };
}
