// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/firewallPolicyIdpsSignaturesFilterValues/operations.js";
import type { FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams } from "../../api/firewallPolicyIdpsSignaturesFilterValues/options.js";
import type {
  SignatureOverridesFilterValuesQuery,
  SignatureOverridesFilterValuesResponse,
} from "../../models/microsoft/network/models.js";

/** Interface representing a FirewallPolicyIdpsSignaturesFilterValues operations. */
export interface FirewallPolicyIdpsSignaturesFilterValuesOperations {
  /** Retrieves the current filter values for the signatures overrides */
  list: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: SignatureOverridesFilterValuesQuery,
    options?: FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams,
  ) => Promise<SignatureOverridesFilterValuesResponse>;
}

function _getFirewallPolicyIdpsSignaturesFilterValues(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: SignatureOverridesFilterValuesQuery,
      options?: FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams,
    ) => list(context, resourceGroupName, firewallPolicyName, parameters, options),
  };
}

export function _getFirewallPolicyIdpsSignaturesFilterValuesOperations(
  context: NetworkManagementContext,
): FirewallPolicyIdpsSignaturesFilterValuesOperations {
  return {
    ..._getFirewallPolicyIdpsSignaturesFilterValues(context),
  };
}
