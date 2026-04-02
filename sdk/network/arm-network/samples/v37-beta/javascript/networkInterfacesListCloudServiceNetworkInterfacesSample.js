// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network interfaces in a cloud service.
 *
 * @summary gets all network interfaces in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServiceNetworkInterfaceList.json
 */
async function listCloudServiceNetworkInterfaces() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listCloudServiceNetworkInterfaces(
    "rg1",
    "cs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCloudServiceNetworkInterfaces();
}

main().catch(console.error);
