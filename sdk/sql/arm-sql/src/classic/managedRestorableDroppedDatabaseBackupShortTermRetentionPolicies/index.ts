// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByRestorableDroppedDatabase,
  update,
  createOrUpdate,
  get,
} from "../../api/managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies/operations.js";
import type {
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOptionalParams,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOptionalParams,
} from "../../api/managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies/options.js";
import type {
  ManagedBackupShortTermRetentionPolicy,
  ManagedShortTermRetentionPolicyName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies operations. */
export interface ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations {
  /** Gets a dropped database's short term retention policy list. */
  listByRestorableDroppedDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedBackupShortTermRetentionPolicy>;
  /** Sets a database's short term retention policy. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
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
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
  /** Sets a database's short term retention policy. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
  /** Gets a dropped database's short term retention policy. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOptionalParams,
  ) => Promise<ManagedBackupShortTermRetentionPolicy>;
}

function _getManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies(
  context: SqlManagementContext,
) {
  return {
    listByRestorableDroppedDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOptionalParams,
    ) =>
      listByRestorableDroppedDatabase(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        options,
      ),
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        policyName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
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
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        policyName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        policyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
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
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      parameters: ManagedBackupShortTermRetentionPolicy,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        policyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      restorableDroppedDatabaseId: string,
      policyName: ManagedShortTermRetentionPolicyName,
      options?: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        restorableDroppedDatabaseId,
        policyName,
        options,
      ),
  };
}

export function _getManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations(
  context: SqlManagementContext,
): ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations {
  return {
    ..._getManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies(context),
  };
}
