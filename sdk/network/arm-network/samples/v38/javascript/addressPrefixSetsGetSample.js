// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified address prefix set.
 *
 * @summary gets the specified address prefix set.
 * x-ms-original-file: 2025-09-01/AddressPrefixSetGet.json
 */
async function getAddressPrefixSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.addressPrefixSets.get("rg1", "test-asg", "test-prefix-set");
  console.log(result);
}

async function main() {
  await getAddressPrefixSet();
}

main().catch(console.error);
