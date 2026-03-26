// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  patch,
  put,
  get,
} from "../../api/firewallPolicyIdpsSignaturesOverrides/operations.js";
import type {
  FirewallPolicyIdpsSignaturesOverridesListOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesPutOptionalParams,
  FirewallPolicyIdpsSignaturesOverridesGetOptionalParams,
} from "../../api/firewallPolicyIdpsSignaturesOverrides/options.js";
import type {
  SignaturesOverrides,
  SignaturesOverridesList,
} from "../../models/microsoft/network/models.js";

/** Interface representing a FirewallPolicyIdpsSignaturesOverrides operations. */
export interface FirewallPolicyIdpsSignaturesOverridesOperations {
  /** Returns all signatures overrides objects for a specific policy as a list containing a single value. */
  list: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyIdpsSignaturesOverridesListOptionalParams,
  ) => Promise<SignaturesOverridesList>;
  /** Will update the status of policy's signature overrides for IDPS */
  patch: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: SignaturesOverrides,
    options?: FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams,
  ) => Promise<SignaturesOverrides>;
  /** Will override/create a new signature overrides for the policy's IDPS */
  put: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: SignaturesOverrides,
    options?: FirewallPolicyIdpsSignaturesOverridesPutOptionalParams,
  ) => Promise<SignaturesOverrides>;
  /** Returns all signatures overrides for a specific policy. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyIdpsSignaturesOverridesGetOptionalParams,
  ) => Promise<SignaturesOverrides>;
}

function _getFirewallPolicyIdpsSignaturesOverrides(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyIdpsSignaturesOverridesListOptionalParams,
    ) => list(context, resourceGroupName, firewallPolicyName, options),
    patch: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: SignaturesOverrides,
      options?: FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams,
    ) => patch(context, resourceGroupName, firewallPolicyName, parameters, options),
    put: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: SignaturesOverrides,
      options?: FirewallPolicyIdpsSignaturesOverridesPutOptionalParams,
    ) => put(context, resourceGroupName, firewallPolicyName, parameters, options),
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyIdpsSignaturesOverridesGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, options),
  };
}

export function _getFirewallPolicyIdpsSignaturesOverridesOperations(
  context: NetworkManagementContext,
): FirewallPolicyIdpsSignaturesOverridesOperations {
  return {
    ..._getFirewallPolicyIdpsSignaturesOverrides(context),
  };
}
