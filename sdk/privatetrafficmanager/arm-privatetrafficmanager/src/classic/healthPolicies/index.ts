// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext } from "../../api/networkContext.js";
import { listByParent, $delete, createOrUpdate, get } from "../../api/healthPolicies/operations.js";
import type {
  HealthPoliciesListByParentOptionalParams,
  HealthPoliciesDeleteOptionalParams,
  HealthPoliciesCreateOrUpdateOptionalParams,
  HealthPoliciesGetOptionalParams,
} from "../../api/healthPolicies/options.js";
import type { HealthPolicyUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HealthPolicies operations. */
export interface HealthPoliciesOperations {
  /** Lists all Health Policies within a Traffic Manager profile. */
  listByParent: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    options?: HealthPoliciesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<HealthPolicyUnion>;
  /** Deletes a Traffic Manager health policy. */
  delete: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    healthPolicyName: string,
    options?: HealthPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a Traffic Manager health policy. */
  createOrUpdate: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    healthPolicyName: string,
    resource: HealthPolicyUnion,
    options?: HealthPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HealthPolicyUnion>, HealthPolicyUnion>;
  /** Gets a Traffic Manager health policy. */
  get: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    healthPolicyName: string,
    options?: HealthPoliciesGetOptionalParams,
  ) => Promise<HealthPolicyUnion>;
}

function _getHealthPolicies(context: NetworkContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      options?: HealthPoliciesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, privateTrafficManagerProfileName, options),
    delete: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      healthPolicyName: string,
      options?: HealthPoliciesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        healthPolicyName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      healthPolicyName: string,
      resource: HealthPolicyUnion,
      options?: HealthPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        healthPolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      healthPolicyName: string,
      options?: HealthPoliciesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, privateTrafficManagerProfileName, healthPolicyName, options),
  };
}

export function _getHealthPoliciesOperations(context: NetworkContext): HealthPoliciesOperations {
  return {
    ..._getHealthPolicies(context),
  };
}
