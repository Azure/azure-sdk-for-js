// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of the subvolumes in the volume
 *
 * @summary returns a list of the subvolumes in the volume
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_List.json
 */
async function subvolumesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subvolumes.listByVolume("myRG", "account1", "pool1", "volume1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await subvolumesList();
}

main().catch(console.error);
