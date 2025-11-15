// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check if a file path is available.
 *
 * @summary check if a file path is available.
 * x-ms-original-file: 2025-09-01/CheckFilePathAvailability.json
 */
async function checkFilePathAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.checkFilePathAvailability("eastus", {
    name: "my-exact-filepth",
    subnetId:
      "/subscriptions/9760acf5-4638-11e7-9bdb-020073ca7778/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
  });
  console.log(result);
}

async function main() {
  await checkFilePathAvailability();
}

main().catch(console.error);
