// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FirewallPoliciesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Firewall Policy.
 *
 * @summary Gets the specified Firewall Policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyGet.json
 */
async function getFirewallPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const options: FirewallPoliciesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
    )
    .get(options);
  console.log(result);
}

getFirewallPolicy().catch(console.error);
