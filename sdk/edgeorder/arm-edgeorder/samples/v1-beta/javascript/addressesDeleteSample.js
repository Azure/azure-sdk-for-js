// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an address.
 *
 * @summary delete an address.
 * x-ms-original-file: 2024-02-01/DeleteAddressByName.json
 */
async function deleteAddressByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  await client.addresses.delete("YourResourceGroupName", "TestAddressName1");
}

async function main() {
  await deleteAddressByName();
}

main().catch(console.error);
