// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all replications for a specified volume
 *
 * @summary list all replications for a specified volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_ListReplications.json
 */
async function volumesListReplications(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.listReplications("myRG", "account1", "pool1", "volume1", {
    body: { exclude: "None" },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await volumesListReplications();
}

main().catch(console.error);
