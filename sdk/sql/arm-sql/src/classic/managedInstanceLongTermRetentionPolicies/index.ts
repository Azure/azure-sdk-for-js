// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedInstanceLongTermRetentionPolicies/operations.js";
import type {
  ManagedInstanceLongTermRetentionPoliciesListByDatabaseOptionalParams,
  ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
  ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ManagedInstanceLongTermRetentionPoliciesGetOptionalParams,
} from "../../api/managedInstanceLongTermRetentionPolicies/options.js";
import type {
  ManagedInstanceLongTermRetentionPolicy,
  ManagedInstanceLongTermRetentionPolicyName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceLongTermRetentionPolicies operations. */
export interface ManagedInstanceLongTermRetentionPoliciesOperations {
  /** Gets a database's long term retention policy. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedInstanceLongTermRetentionPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceLongTermRetentionPolicy>;
  /** Deletes a managed database's long term retention policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstanceLongTermRetentionPolicy>,
    ManagedInstanceLongTermRetentionPolicy
  >;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstanceLongTermRetentionPolicy>,
      ManagedInstanceLongTermRetentionPolicy
    >
  >;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
  ) => Promise<ManagedInstanceLongTermRetentionPolicy>;
  /** Sets a managed database's long term retention policy. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    parameters: ManagedInstanceLongTermRetentionPolicy,
    options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstanceLongTermRetentionPolicy>,
    ManagedInstanceLongTermRetentionPolicy
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    parameters: ManagedInstanceLongTermRetentionPolicy,
    options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstanceLongTermRetentionPolicy>,
      ManagedInstanceLongTermRetentionPolicy
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    parameters: ManagedInstanceLongTermRetentionPolicy,
    options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceLongTermRetentionPolicy>;
  /** Gets a managed database's long term retention policy. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedInstanceLongTermRetentionPolicyName,
    options?: ManagedInstanceLongTermRetentionPoliciesGetOptionalParams,
  ) => Promise<ManagedInstanceLongTermRetentionPolicy>;
}

function _getManagedInstanceLongTermRetentionPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedInstanceLongTermRetentionPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, managedInstanceName, databaseName, policyName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      options?: ManagedInstanceLongTermRetentionPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      parameters: ManagedInstanceLongTermRetentionPolicy,
      options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      parameters: ManagedInstanceLongTermRetentionPolicy,
      options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      parameters: ManagedInstanceLongTermRetentionPolicy,
      options?: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: ManagedInstanceLongTermRetentionPolicyName,
      options?: ManagedInstanceLongTermRetentionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, databaseName, policyName, options),
  };
}

export function _getManagedInstanceLongTermRetentionPoliciesOperations(
  context: SqlManagementContext,
): ManagedInstanceLongTermRetentionPoliciesOperations {
  return {
    ..._getManagedInstanceLongTermRetentionPolicies(context),
  };
}
