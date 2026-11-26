// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/policyGroups/operations.js";
import type {
  PolicyGroupsListBySubscriptionOptionalParams,
  PolicyGroupsListByResourceGroupOptionalParams,
  PolicyGroupsDeleteOptionalParams,
  PolicyGroupsUpdateOptionalParams,
  PolicyGroupsCreateOrUpdateOptionalParams,
  PolicyGroupsGetOptionalParams,
} from "../../api/policyGroups/options.js";
import type { PolicyGroup } from "../../models/microsoft/networkSecurity/models.js";
import type { PolicyGroupTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PolicyGroups operations. */
export interface PolicyGroupsOperations {
  /** List PolicyGroup resources by subscription ID */
  listBySubscription: (
    options?: PolicyGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyGroup>;
  /** List PolicyGroup resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PolicyGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyGroup>;
  /** Delete a PolicyGroup */
  delete: (
    resourceGroupName: string,
    policyGroupName: string,
    options?: PolicyGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a PolicyGroup */
  update: (
    resourceGroupName: string,
    policyGroupName: string,
    properties: PolicyGroupTagsUpdate,
    options?: PolicyGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<PolicyGroup>, PolicyGroup>;
  /**
   * Creates or replaces a PolicyGroup.
   *
   * If the PUT introduces a ContentInspection policy in networkSecurityPolicies and any
   * associated fabric has no configured inspection connection, reject the
   * request with HTTP 409 and error code ContentInspectionCapabilityDisabled, targeting
   * properties.networkSecurityPolicies. Validate before persisting or distributing policy changes,
   * preserving the previously accepted policies on rejection. Do not partially apply changes to
   * compatible fabrics or silently skip inspection for fabrics without an inspection connection.
   *
   * Compatibility uses the associated fabrics' stored configuration, independent of whether
   * policy selectors currently match traffic. This is a configuration check, not a fresh Content
   * Safety connectivity probe. Changes that do not introduce ContentInspection policies do not
   * require this check; transient connection failures do not remove a fabric's configuration.
   * Existing legacy fabrics without a profile retain their regional Content Safety connection,
   * which satisfies the inspection prerequisite without new probes, management calls, or key
   * retrieval. A connection still being validated is not an absent connection.
   * Unattached groups and groups associated only with compatible fabrics may
   * contain ContentInspection policies. Removing those policies or detaching a group
   * remains allowed, subject to other validation. Tags-only PATCH does not change policy contents.
   * Error messages must not disclose associated fabric IDs the caller is not authorized to read.
   *
   * Example rejection response (HTTP 409 Conflict):
   *
   * ```json
   * {
   *   "error": {
   *     "code": "ContentInspectionCapabilityDisabled",
   *     "message": "The proposed ContentInspection policy is incompatible with an associated fabric that has no configured inspection connection.",
   *     "target": "properties.networkSecurityPolicies"
   *   }
   * }
   * ```
   */
  createOrUpdate: (
    resourceGroupName: string,
    policyGroupName: string,
    resource: PolicyGroup,
    options?: PolicyGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PolicyGroup>, PolicyGroup>;
  /** Get a PolicyGroup */
  get: (
    resourceGroupName: string,
    policyGroupName: string,
    options?: PolicyGroupsGetOptionalParams,
  ) => Promise<PolicyGroup>;
}

function _getPolicyGroups(context: NetworkSecurityManagementContext) {
  return {
    listBySubscription: (options?: PolicyGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PolicyGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      policyGroupName: string,
      options?: PolicyGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, policyGroupName, options),
    update: (
      resourceGroupName: string,
      policyGroupName: string,
      properties: PolicyGroupTagsUpdate,
      options?: PolicyGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, policyGroupName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      policyGroupName: string,
      resource: PolicyGroup,
      options?: PolicyGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, policyGroupName, resource, options),
    get: (
      resourceGroupName: string,
      policyGroupName: string,
      options?: PolicyGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, policyGroupName, options),
  };
}

export function _getPolicyGroupsOperations(
  context: NetworkSecurityManagementContext,
): PolicyGroupsOperations {
  return {
    ..._getPolicyGroups(context),
  };
}
