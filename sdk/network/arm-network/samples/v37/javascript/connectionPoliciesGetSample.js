// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a ConnectionPolicy.
 *
 * @summary retrieves the details of a ConnectionPolicy.
 * x-ms-original-file: 2025-07-01/ConnectionPolicyGet.json
 */
async function connectionPolicyGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionPolicies.get("rg1", "TestHub", "testpolicy");
  console.log(result);
}

async function main() {
  await connectionPolicyGet();
}

main().catch(console.error);
