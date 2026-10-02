// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified authentication policy.
 *
 * @summary deletes the specified authentication policy.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyDelete.json
 */
async function deletesAnAuthenticationPolicyWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.authenticationPolicies.delete("rg1", "authPolicy1");
}

async function main() {
  await deletesAnAuthenticationPolicyWithinAResourceGroup();
}

main().catch(console.error);
