// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve protection policy with specified name within a resource group.
 *
 * @summary retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: 2025-05-01/WafPolicyGet.json
 */
async function getsAWAFPolicyWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.webApplicationFirewallPolicies.get("rg1", "Policy1");
  console.log(result);
}

async function main() {
  await getsAWAFPolicyWithinAResourceGroup();
}

main().catch(console.error);
