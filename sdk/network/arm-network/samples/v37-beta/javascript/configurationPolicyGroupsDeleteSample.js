// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a ConfigurationPolicyGroup.
 *
 * @summary deletes a ConfigurationPolicyGroup.
 * x-ms-original-file: 2025-05-01/ConfigurationPolicyGroupDelete.json
 */
async function configurationPolicyGroupDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.configurationPolicyGroups.delete("rg1", "vpnServerConfiguration1", "policyGroup1");
}

async function main() {
  await configurationPolicyGroupDelete();
}

main().catch(console.error);
