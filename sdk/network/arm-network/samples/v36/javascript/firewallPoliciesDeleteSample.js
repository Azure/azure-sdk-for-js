// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified Firewall Policy.
 *
 * @summary Deletes the specified Firewall Policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyDelete.json
 */
async function deleteFirewallPolicy() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicies.beginDeleteAndWait(
    resourceGroupName,
    firewallPolicyName,
  );
  console.log(result);
}

async function main() {
  await deleteFirewallPolicy();
}

main().catch(console.error);
