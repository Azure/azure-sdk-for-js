// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import {
  acquireAtResourceGroup,
  acquireAtManagementGroup,
  acquire,
} from "../../api/policyTokens/operations.js";
import type {
  PolicyTokensAcquireAtResourceGroupOptionalParams,
  PolicyTokensAcquireAtManagementGroupOptionalParams,
  PolicyTokensAcquireOptionalParams,
} from "../../api/policyTokens/options.js";
import type { PolicyTokenRequest, PolicyTokenResponse } from "../../models/models.js";

/** Interface representing a PolicyTokens operations. */
export interface PolicyTokensOperations {
  /** This operation acquires a policy token in the given resource group for the given request body. */
  acquireAtResourceGroup: (
    resourceGroupName: string,
    parameters: PolicyTokenRequest,
    options?: PolicyTokensAcquireAtResourceGroupOptionalParams,
  ) => Promise<PolicyTokenResponse>;
  /** This operation acquires a policy token in the given management group for the given request body. */
  acquireAtManagementGroup: (
    managementGroupName: string,
    parameters: PolicyTokenRequest,
    options?: PolicyTokensAcquireAtManagementGroupOptionalParams,
  ) => Promise<PolicyTokenResponse>;
  /** This operation acquires a policy token in the given subscription for the given request body. */
  acquire: (
    parameters: PolicyTokenRequest,
    options?: PolicyTokensAcquireOptionalParams,
  ) => Promise<PolicyTokenResponse>;
}

function _getPolicyTokens(context: PolicyContext) {
  return {
    acquireAtResourceGroup: (
      resourceGroupName: string,
      parameters: PolicyTokenRequest,
      options?: PolicyTokensAcquireAtResourceGroupOptionalParams,
    ) => acquireAtResourceGroup(context, resourceGroupName, parameters, options),
    acquireAtManagementGroup: (
      managementGroupName: string,
      parameters: PolicyTokenRequest,
      options?: PolicyTokensAcquireAtManagementGroupOptionalParams,
    ) => acquireAtManagementGroup(context, managementGroupName, parameters, options),
    acquire: (parameters: PolicyTokenRequest, options?: PolicyTokensAcquireOptionalParams) =>
      acquire(context, parameters, options),
  };
}

export function _getPolicyTokensOperations(context: PolicyContext): PolicyTokensOperations {
  return {
    ..._getPolicyTokens(context),
  };
}
