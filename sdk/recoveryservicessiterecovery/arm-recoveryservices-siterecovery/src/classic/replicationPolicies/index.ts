// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/replicationPolicies/operations.js";
import type {
  ReplicationPoliciesListOptionalParams,
  ReplicationPoliciesDeleteOptionalParams,
  ReplicationPoliciesUpdateOptionalParams,
  ReplicationPoliciesCreateOptionalParams,
  ReplicationPoliciesGetOptionalParams,
} from "../../api/replicationPolicies/options.js";
import type { Policy, CreatePolicyInput, UpdatePolicyInput } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationPolicies operations. */
export interface ReplicationPoliciesOperations {
  /** Lists the replication policies for a vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<Policy>;
  /** The operation to delete a replication policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    options?: ReplicationPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    options?: ReplicationPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    options?: ReplicationPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a replication policy. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: UpdatePolicyInput,
    options?: ReplicationPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<Policy>, Policy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: UpdatePolicyInput,
    options?: ReplicationPoliciesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Policy>, Policy>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: UpdatePolicyInput,
    options?: ReplicationPoliciesUpdateOptionalParams,
  ) => Promise<Policy>;
  /** The operation to create a replication policy. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: CreatePolicyInput,
    options?: ReplicationPoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<Policy>, Policy>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: CreatePolicyInput,
    options?: ReplicationPoliciesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Policy>, Policy>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    input: CreatePolicyInput,
    options?: ReplicationPoliciesCreateOptionalParams,
  ) => Promise<Policy>;
  /** Gets the details of a replication policy. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    policyName: string,
    options?: ReplicationPoliciesGetOptionalParams,
  ) => Promise<Policy>;
}

function _getReplicationPolicies(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      options?: ReplicationPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, policyName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      options?: ReplicationPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, policyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      options?: ReplicationPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, policyName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: UpdatePolicyInput,
      options?: ReplicationPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, policyName, input, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: UpdatePolicyInput,
      options?: ReplicationPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, resourceName, policyName, input, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: UpdatePolicyInput,
      options?: ReplicationPoliciesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, resourceName, policyName, input, options);
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: CreatePolicyInput,
      options?: ReplicationPoliciesCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, policyName, input, options),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: CreatePolicyInput,
      options?: ReplicationPoliciesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, resourceName, policyName, input, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      input: CreatePolicyInput,
      options?: ReplicationPoliciesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, resourceName, policyName, input, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      policyName: string,
      options?: ReplicationPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, policyName, options),
  };
}

export function _getReplicationPoliciesOperations(
  context: SiteRecoveryManagementContext,
): ReplicationPoliciesOperations {
  return {
    ..._getReplicationPolicies(context),
  };
}
