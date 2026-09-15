// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all address prefix sets in an application security group.
 *
 * @summary gets all address prefix sets in an application security group.
 * x-ms-original-file: 2025-09-01/AddressPrefixSetList.json
 */
async function listAddressPrefixSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.addressPrefixSets.list("rg1", "test-asg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAddressPrefixSets();
}

main().catch(console.error);
