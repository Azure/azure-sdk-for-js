// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/backupPolicies/operations.js";
import type {
  BackupPoliciesListOptionalParams,
  BackupPoliciesDeleteOptionalParams,
  BackupPoliciesCreateOrUpdateOptionalParams,
  BackupPoliciesGetOptionalParams,
} from "../../api/backupPolicies/options.js";
import type { BaseBackupPolicyResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupPolicies operations. */
export interface BackupPoliciesOperations {
  /** Returns list of backup policies belonging to a backup vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<BaseBackupPolicyResource>;
  /** Deletes a backup policy belonging to a backup vault */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    options?: BackupPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates a backup policy belonging to a backup vault */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    parameters: BaseBackupPolicyResource,
    options?: BackupPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<BaseBackupPolicyResource>;
  /** Gets a backup policy belonging to a backup vault */
  get: (
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    options?: BackupPoliciesGetOptionalParams,
  ) => Promise<BaseBackupPolicyResource>;
}

function _getBackupPolicies(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: BackupPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      backupPolicyName: string,
      options?: BackupPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, backupPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      backupPolicyName: string,
      parameters: BaseBackupPolicyResource,
      options?: BackupPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, vaultName, backupPolicyName, parameters, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      backupPolicyName: string,
      options?: BackupPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, backupPolicyName, options),
  };
}

export function _getBackupPoliciesOperations(
  context: DataProtectionContext,
): BackupPoliciesOperations {
  return {
    ..._getBackupPolicies(context),
  };
}
