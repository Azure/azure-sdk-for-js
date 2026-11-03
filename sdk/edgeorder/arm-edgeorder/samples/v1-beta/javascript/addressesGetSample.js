// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about the specified address.
 *
 * @summary get information about the specified address.
 * x-ms-original-file: 2024-02-01/GetAddressByName.json
 */
async function getAddressByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const result = await client.addresses.get("YourResourceGroupName", "TestAddressName1");
  console.log(result);
}

async function main() {
  await getAddressByName();
}

main().catch(console.error);
