// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  checkAtManagementGroupScope,
  checkAtResourceGroupScope,
  checkAtSubscriptionScope,
} from "../../api/policyRestrictions/operations.js";
import type {
  PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams,
} from "../../api/policyRestrictions/options.js";
import type {
  CheckRestrictionsRequest,
  CheckRestrictionsResult,
  CheckManagementGroupRestrictionsRequest,
} from "../../models/policyInsightsApi/models.js";

/** Interface representing a PolicyRestrictions operations. */
export interface PolicyRestrictionsOperations {
  /** Checks what restrictions Azure Policy will place on resources within a management group. */
  checkAtManagementGroupScope: (
    managementGroupId: string,
    parameters: CheckManagementGroupRestrictionsRequest,
    options?: PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams,
  ) => Promise<CheckRestrictionsResult>;
  /** Checks what restrictions Azure Policy will place on a resource within a resource group. Use this when the resource group the resource will be created in is already known. */
  checkAtResourceGroupScope: (
    resourceGroupName: string,
    parameters: CheckRestrictionsRequest,
    options?: PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams,
  ) => Promise<CheckRestrictionsResult>;
  /** Checks what restrictions Azure Policy will place on a resource within a subscription. */
  checkAtSubscriptionScope: (
    parameters: CheckRestrictionsRequest,
    options?: PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams,
  ) => Promise<CheckRestrictionsResult>;
}

function _getPolicyRestrictions(context: PolicyInsightsContext) {
  return {
    checkAtManagementGroupScope: (
      managementGroupId: string,
      parameters: CheckManagementGroupRestrictionsRequest,
      options?: PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams,
    ) => checkAtManagementGroupScope(context, managementGroupId, parameters, options),
    checkAtResourceGroupScope: (
      resourceGroupName: string,
      parameters: CheckRestrictionsRequest,
      options?: PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams,
    ) => checkAtResourceGroupScope(context, resourceGroupName, parameters, options),
    checkAtSubscriptionScope: (
      parameters: CheckRestrictionsRequest,
      options?: PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams,
    ) => checkAtSubscriptionScope(context, parameters, options),
  };
}

export function _getPolicyRestrictionsOperations(
  context: PolicyInsightsContext,
): PolicyRestrictionsOperations {
  return {
    ..._getPolicyRestrictions(context),
  };
}
