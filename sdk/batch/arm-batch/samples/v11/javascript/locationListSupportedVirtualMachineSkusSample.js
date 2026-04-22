// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of Batch supported Virtual Machine VM sizes available at the given location.
 *
 * @summary gets the list of Batch supported Virtual Machine VM sizes available at the given location.
 * x-ms-original-file: 2025-06-01/LocationListVirtualMachineSkus.json
 */
async function locationListVirtualMachineSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listSupportedVirtualMachineSkus("japaneast")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await locationListVirtualMachineSkus();
}

main().catch(console.error);
