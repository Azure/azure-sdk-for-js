// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { deploy } from "../../api/firewallPolicyDeployments/operations.js";
import type { FirewallPolicyDeploymentsDeployOptionalParams } from "../../api/firewallPolicyDeployments/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallPolicyDeployments operations. */
export interface FirewallPolicyDeploymentsOperations {
  /** Deploys the firewall policy draft and child rule collection group drafts. */
  deploy: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDeploymentsDeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deploy instead */
  beginDeploy: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDeploymentsDeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deploy instead */
  beginDeployAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDeploymentsDeployOptionalParams,
  ) => Promise<void>;
}

function _getFirewallPolicyDeployments(context: NetworkManagementContext) {
  return {
    deploy: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyDeploymentsDeployOptionalParams,
    ) => deploy(context, resourceGroupName, firewallPolicyName, options),
    beginDeploy: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyDeploymentsDeployOptionalParams,
    ) => {
      const poller = deploy(context, resourceGroupName, firewallPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeployAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyDeploymentsDeployOptionalParams,
    ) => {
      return await deploy(context, resourceGroupName, firewallPolicyName, options);
    },
  };
}

export function _getFirewallPolicyDeploymentsOperations(
  context: NetworkManagementContext,
): FirewallPolicyDeploymentsOperations {
  return {
    ..._getFirewallPolicyDeployments(context),
  };
}
