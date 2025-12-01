// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to describes all buckets belonging to a volume. Buckets allow additional services, such as AI services, connect to the volume data contained in those buckets.
 *
 * @summary describes all buckets belonging to a volume. Buckets allow additional services, such as AI services, connect to the volume data contained in those buckets.
 * x-ms-original-file: 2025-09-01-preview/Buckets_List.json
 */
async function bucketsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.buckets.list("myRG", "account1", "pool1", "volume1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bucketsList();
}

main().catch(console.error);
