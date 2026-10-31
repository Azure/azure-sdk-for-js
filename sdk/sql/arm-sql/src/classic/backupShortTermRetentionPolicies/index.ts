// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  update,
  createOrUpdate,
  get,
} from "../../api/backupShortTermRetentionPolicies/operations.js";
import type {
  BackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
  BackupShortTermRetentionPoliciesUpdateOptionalParams,
  BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  BackupShortTermRetentionPoliciesGetOptionalParams,
} from "../../api/backupShortTermRetentionPolicies/options.js";
import type {
  BackupShortTermRetentionPolicy,
  ShortTermRetentionPolicyName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupShortTermRetentionPolicies operations. */
export interface BackupShortTermRetentionPoliciesOperations {
  /** Gets a database's short term retention policy. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: BackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<BackupShortTermRetentionPolicy>;
  /** Updates a database's short term retention policy. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupShortTermRetentionPolicy>, BackupShortTermRetentionPolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BackupShortTermRetentionPolicy>, BackupShortTermRetentionPolicy>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => Promise<BackupShortTermRetentionPolicy>;
  /** Updates a database's short term retention policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BackupShortTermRetentionPolicy>, BackupShortTermRetentionPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<BackupShortTermRetentionPolicy>, BackupShortTermRetentionPolicy>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    parameters: BackupShortTermRetentionPolicy,
    options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<BackupShortTermRetentionPolicy>;
  /** Gets a database's short term retention policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: ShortTermRetentionPolicyName,
    options?: BackupShortTermRetentionPoliciesGetOptionalParams,
  ) => Promise<BackupShortTermRetentionPolicy>;
}

function _getBackupShortTermRetentionPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: BackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serverName, databaseName, policyName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      parameters: BackupShortTermRetentionPolicy,
      options?: BackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: ShortTermRetentionPolicyName,
      options?: BackupShortTermRetentionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, policyName, options),
  };
}

export function _getBackupShortTermRetentionPoliciesOperations(
  context: SqlManagementContext,
): BackupShortTermRetentionPoliciesOperations {
  return {
    ..._getBackupShortTermRetentionPolicies(context),
  };
}
