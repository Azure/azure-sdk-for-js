// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a file path is available.
 *
 * @summary check if a file path is available.
 * x-ms-original-file: 2025-09-01-preview/CheckFilePathAvailability.json
 */
async function checkFilePathAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.checkFilePathAvailability("eastus", {
    name: "my-exact-filepth",
    subnetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkFilePathAvailability();
}

main().catch(console.error);
