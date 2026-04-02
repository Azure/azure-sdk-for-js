// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all signatures overrides for a specific policy.
 *
 * @summary returns all signatures overrides for a specific policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicySignatureOverridesGet.json
 */
async function getSignatureOverrides() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyIdpsSignaturesOverrides.get("rg1", "firewallPolicy");
  console.log(result);
}

async function main() {
  await getSignatureOverrides();
}

main().catch(console.error);
