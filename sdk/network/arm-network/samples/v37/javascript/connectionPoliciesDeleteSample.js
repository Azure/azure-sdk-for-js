// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a ConnectionPolicy.
 *
 * @summary deletes a ConnectionPolicy.
 * x-ms-original-file: 2025-07-01/ConnectionPolicyDelete.json
 */
async function connectionPolicyDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.connectionPolicies.delete("rg1", "TestHub", "testpolicy");
}

async function main() {
  await connectionPolicyDelete();
}

main().catch(console.error);
