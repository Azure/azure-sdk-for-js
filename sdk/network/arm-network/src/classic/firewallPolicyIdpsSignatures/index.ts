// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/firewallPolicyIdpsSignatures/operations.js";
import type { FirewallPolicyIdpsSignaturesListOptionalParams } from "../../api/firewallPolicyIdpsSignatures/options.js";
import type { IdpsQueryObject, QueryResults } from "../../models/microsoft/network/models.js";

/** Interface representing a FirewallPolicyIdpsSignatures operations. */
export interface FirewallPolicyIdpsSignaturesOperations {
  /** Retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned signatures is 1000. */
  list: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: IdpsQueryObject,
    options?: FirewallPolicyIdpsSignaturesListOptionalParams,
  ) => Promise<QueryResults>;
}

function _getFirewallPolicyIdpsSignatures(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: IdpsQueryObject,
      options?: FirewallPolicyIdpsSignaturesListOptionalParams,
    ) => list(context, resourceGroupName, firewallPolicyName, parameters, options),
  };
}

export function _getFirewallPolicyIdpsSignaturesOperations(
  context: NetworkManagementContext,
): FirewallPolicyIdpsSignaturesOperations {
  return {
    ..._getFirewallPolicyIdpsSignatures(context),
  };
}
