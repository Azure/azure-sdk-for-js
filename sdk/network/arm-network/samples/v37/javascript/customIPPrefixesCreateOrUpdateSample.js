// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a custom IP prefix.
 *
 * @summary creates or updates a custom IP prefix.
 * x-ms-original-file: 2025-05-01/CustomIpPrefixCreateCustomizedValues.json
 */
async function createCustomIPPrefixAllocationMethod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.createOrUpdate("rg1", "test-customipprefix", {
    location: "westus",
    cidr: "0.0.0.0/24",
  });
  console.log(result);
}

async function main() {
  await createCustomIPPrefixAllocationMethod();
}

main().catch(console.error);
