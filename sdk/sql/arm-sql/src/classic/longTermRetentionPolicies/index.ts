// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/longTermRetentionPolicies/operations.js";
import type {
  LongTermRetentionPoliciesListByDatabaseOptionalParams,
  LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  LongTermRetentionPoliciesGetOptionalParams,
} from "../../api/longTermRetentionPolicies/options.js";
import type { LongTermRetentionPolicy, LongTermRetentionPolicyName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LongTermRetentionPolicies operations. */
export interface LongTermRetentionPoliciesOperations {
  /** Gets a database's long term retention policy. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: LongTermRetentionPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<LongTermRetentionPolicy>;
  /** Set or update a database's long term retention policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    parameters: LongTermRetentionPolicy,
    options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LongTermRetentionPolicy>, LongTermRetentionPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    parameters: LongTermRetentionPolicy,
    options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LongTermRetentionPolicy>, LongTermRetentionPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    parameters: LongTermRetentionPolicy,
    options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<LongTermRetentionPolicy>;
  /** Gets a database's long term retention policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    options?: LongTermRetentionPoliciesGetOptionalParams,
  ) => Promise<LongTermRetentionPolicy>;
}

function _getLongTermRetentionPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: LongTermRetentionPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      policyName: LongTermRetentionPolicyName,
      parameters: LongTermRetentionPolicy,
      options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: LongTermRetentionPolicyName,
      parameters: LongTermRetentionPolicy,
      options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: LongTermRetentionPolicyName,
      parameters: LongTermRetentionPolicy,
      options?: LongTermRetentionPoliciesCreateOrUpdateOptionalParams,
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
      policyName: LongTermRetentionPolicyName,
      options?: LongTermRetentionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, policyName, options),
  };
}

export function _getLongTermRetentionPoliciesOperations(
  context: SqlManagementContext,
): LongTermRetentionPoliciesOperations {
  return {
    ..._getLongTermRetentionPolicies(context),
  };
}
