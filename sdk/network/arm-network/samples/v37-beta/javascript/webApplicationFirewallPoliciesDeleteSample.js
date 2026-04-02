// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Policy.
 *
 * @summary deletes Policy.
 * x-ms-original-file: 2025-05-01/WafPolicyDelete.json
 */
async function deletesAWAFPolicyWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.webApplicationFirewallPolicies.delete("rg1", "Policy1");
}

async function main() {
  await deletesAWAFPolicyWithinAResourceGroup();
}

main().catch(console.error);
