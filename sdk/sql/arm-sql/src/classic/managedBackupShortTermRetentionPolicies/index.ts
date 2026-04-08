// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  update,
  createOrUpdate,
  get,
} from "../../api/managedBackupShortTermRetentionPolicies/operations.js";
import type {
  ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
  ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ManagedBackupShortTermRetentionPoliciesGetOptionalParams,
} from "../../api/managedBackupShortTermRetentionPolicies/options.js";
import type {
  ManagedBackupShortTermRetentionPolicy,
  ManagedShortTermRetentionPolicyName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedBackupShortTermRetentionPolicies operations. */
export interface ManagedBackupShortTermRetentionPoliciesOperations {
  /** Gets a managed database's short term retention policy list. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedBackupShortTermRetentionPolicy>;
  /** Updates a managed database's short term retention policy. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedBackupShortTermRetentionPolicy>,
      ManagedBackupShortTermRetentionPolicy
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
  /** Updates a managed database's short term retention policy. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedBackupShortTermRetentionPolicy>,
      ManagedBackupShortTermRetentionPolicy
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
  /** Gets a managed database's short term retention policy. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    options?: ManagedBackupShortTermRetentionPoliciesGetOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
}

function _getManagedBackupShortTermRetentionPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        managedInstanceName,
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
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
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
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedShortTermRetentionPolicyName,
      options?: ManagedBackupShortTermRetentionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, policyName, options),
  };
}

export function _getManagedBackupShortTermRetentionPoliciesOperations(
  context: SqlManagementContext,
): ManagedBackupShortTermRetentionPoliciesOperations {
  return {
    ..._getManagedBackupShortTermRetentionPolicies(context),
  };
}
