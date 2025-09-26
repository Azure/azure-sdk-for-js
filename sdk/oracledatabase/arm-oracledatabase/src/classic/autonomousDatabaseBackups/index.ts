// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByParent,
  update,
  $delete,
  get,
  createOrUpdate,
} from "../../api/autonomousDatabaseBackups/operations.js";
import type {
  AutonomousDatabaseBackupsListByParentOptionalParams,
  AutonomousDatabaseBackupsUpdateOptionalParams,
  AutonomousDatabaseBackupsDeleteOptionalParams,
  AutonomousDatabaseBackupsGetOptionalParams,
  AutonomousDatabaseBackupsCreateOrUpdateOptionalParams,
} from "../../api/autonomousDatabaseBackups/options.js";
import type {
  AutonomousDatabaseBackup,
  AutonomousDatabaseBackupUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutonomousDatabaseBackups operations. */
export interface AutonomousDatabaseBackupsOperations {
  /** List AutonomousDatabaseBackup resources by AutonomousDatabase */
  listByParent: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    options?: AutonomousDatabaseBackupsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDatabaseBackup>;
  /** Update a AutonomousDatabaseBackup */
  update: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    adbbackupid: string,
    properties: AutonomousDatabaseBackupUpdate,
    options?: AutonomousDatabaseBackupsUpdateOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabaseBackup>, AutonomousDatabaseBackup>;
  /** Delete a AutonomousDatabaseBackup */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    adbbackupid: string,
    options?: AutonomousDatabaseBackupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a AutonomousDatabaseBackup */
  get: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    adbbackupid: string,
    options?: AutonomousDatabaseBackupsGetOptionalParams,
  ) => Promise<AutonomousDatabaseBackup>;
  /** Create a AutonomousDatabaseBackup */
  createOrUpdate: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    adbbackupid: string,
    resource: AutonomousDatabaseBackup,
    options?: AutonomousDatabaseBackupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabaseBackup>, AutonomousDatabaseBackup>;
}

function _getAutonomousDatabaseBackups(context: OracleDatabaseManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      options?: AutonomousDatabaseBackupsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, autonomousdatabasename, options),
    update: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      adbbackupid: string,
      properties: AutonomousDatabaseBackupUpdate,
      options?: AutonomousDatabaseBackupsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, autonomousdatabasename, adbbackupid, properties, options),
    delete: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      adbbackupid: string,
      options?: AutonomousDatabaseBackupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, autonomousdatabasename, adbbackupid, options),
    get: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      adbbackupid: string,
      options?: AutonomousDatabaseBackupsGetOptionalParams,
    ) => get(context, resourceGroupName, autonomousdatabasename, adbbackupid, options),
    createOrUpdate: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      adbbackupid: string,
      resource: AutonomousDatabaseBackup,
      options?: AutonomousDatabaseBackupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        autonomousdatabasename,
        adbbackupid,
        resource,
        options,
      ),
  };
}

export function _getAutonomousDatabaseBackupsOperations(
  context: OracleDatabaseManagementContext,
): AutonomousDatabaseBackupsOperations {
  return {
    ..._getAutonomousDatabaseBackups(context),
  };
}
