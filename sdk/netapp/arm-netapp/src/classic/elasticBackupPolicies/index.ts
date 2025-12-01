// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByElasticAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticBackupPolicies/operations.js";
import type {
  ElasticBackupPoliciesListByElasticAccountOptionalParams,
  ElasticBackupPoliciesDeleteOptionalParams,
  ElasticBackupPoliciesUpdateOptionalParams,
  ElasticBackupPoliciesCreateOrUpdateOptionalParams,
  ElasticBackupPoliciesGetOptionalParams,
} from "../../api/elasticBackupPolicies/options.js";
import type { ElasticBackupPolicy, ElasticBackupPolicyUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticBackupPolicies operations. */
export interface ElasticBackupPoliciesOperations {
  /** List and describe all Elastic Backup Policies in the elastic account. */
  listByElasticAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticBackupPoliciesListByElasticAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticBackupPolicy>;
  /** Delete the specified Elastic Policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: ElasticBackupPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified NetApp Elastic Backup Policy */
  update: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: ElasticBackupPolicyUpdate,
    options?: ElasticBackupPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackupPolicy>, ElasticBackupPolicy>;
  /** Create or update the specified Elastic Backup Policy in the NetApp account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: ElasticBackupPolicy,
    options?: ElasticBackupPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticBackupPolicy>, ElasticBackupPolicy>;
  /** Get the Elastic Backup Policy */
  get: (
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: ElasticBackupPoliciesGetOptionalParams,
  ) => Promise<ElasticBackupPolicy>;
}

function _getElasticBackupPolicies(context: NetAppManagementContext) {
  return {
    listByElasticAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticBackupPoliciesListByElasticAccountOptionalParams,
    ) => listByElasticAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      options?: ElasticBackupPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, backupPolicyName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      body: ElasticBackupPolicyUpdate,
      options?: ElasticBackupPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, backupPolicyName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      body: ElasticBackupPolicy,
      options?: ElasticBackupPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, backupPolicyName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      backupPolicyName: string,
      options?: ElasticBackupPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, backupPolicyName, options),
  };
}

export function _getElasticBackupPoliciesOperations(
  context: NetAppManagementContext,
): ElasticBackupPoliciesOperations {
  return {
    ..._getElasticBackupPolicies(context),
  };
}
