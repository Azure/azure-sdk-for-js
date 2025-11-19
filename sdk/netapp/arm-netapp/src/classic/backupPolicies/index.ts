// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/backupPolicies/operations.js";
import {
  BackupPoliciesListOptionalParams,
  BackupPoliciesDeleteOptionalParams,
  BackupPoliciesUpdateOptionalParams,
  BackupPoliciesCreateOptionalParams,
  BackupPoliciesGetOptionalParams,
} from "../../api/backupPolicies/options.js";
import { BackupPolicy, BackupPolicyPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupPolicies operations. */
export interface BackupPoliciesOperations {
  /** List backup policies for Netapp Account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: BackupPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<BackupPolicy>;
  /** Delete backup policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: BackupPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a backup policy for Netapp Account */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicyPatch,
    options?: BackupPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupPolicy>, BackupPolicy>;
  /** Create a backup policy for Netapp Account */
  create: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicy,
    options?: BackupPoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<BackupPolicy>, BackupPolicy>;
  /** Get a particular backup Policy */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: BackupPoliciesGetOptionalParams,
  ) => Promise<BackupPolicy>;
}

function _getBackupPolicies(context: NetAppManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: BackupPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      options?: BackupPoliciesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        backupPolicyName,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      body: BackupPolicyPatch,
      options?: BackupPoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        backupPolicyName,
        body,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      body: BackupPolicy,
      options?: BackupPoliciesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        backupPolicyName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      options?: BackupPoliciesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, accountName, backupPolicyName, options),
  };
}

export function _getBackupPoliciesOperations(
  context: NetAppManagementContext,
): BackupPoliciesOperations {
  return {
    ..._getBackupPolicies(context),
  };
}
