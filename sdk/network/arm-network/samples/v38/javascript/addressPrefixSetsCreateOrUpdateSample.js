// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an address prefix set.
 *
 * @summary creates or updates an address prefix set.
 * x-ms-original-file: 2025-09-01/AddressPrefixSetCreate.json
 */
async function createAddressPrefixSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.addressPrefixSets.createOrUpdate(
    "rg1",
    "test-asg",
    "test-prefix-set",
    { properties: { addressPrefixes: ["10.0.0.0/16", "192.168.1.0/24", "2001:db8::/32"] } },
  );
  console.log(result);
}

async function main() {
  await createAddressPrefixSet();
}

main().catch(console.error);
