// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deploys the firewall policy draft and child rule collection group drafts.
 *
 * @summary Deploys the firewall policy draft and child rule collection group drafts.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyDraftDeploy.json
 */
async function deployFirewallPolicyDraft() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyDeployments.beginDeployAndWait(
    resourceGroupName,
    firewallPolicyName,
  );
  console.log(result);
}

async function main() {
  await deployFirewallPolicyDraft();
}

main().catch(console.error);
