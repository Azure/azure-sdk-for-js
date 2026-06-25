// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/backupPolicies/operations.js";
import {
  BackupPoliciesListOptionalParams,
  BackupPoliciesDeleteOptionalParams,
  BackupPoliciesCreateOrUpdateOptionalParams,
  BackupPoliciesGetOptionalParams,
} from "../../api/backupPolicies/options.js";
import { BaseBackupPolicyResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupPolicies operations. */
export interface BackupPoliciesOperations {
  /** Returns list of backup policies belonging to a backup vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<BaseBackupPolicyResource>;
  /** Deletes a backup policy belonging to a backup vault */
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
