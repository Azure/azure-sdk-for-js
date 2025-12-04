// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details of the specified volume's bucket. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets.
 *
 * @summary get the details of the specified volume's bucket. A bucket allows additional services, such as AI services, connect to the volume data contained in those buckets.
 * x-ms-original-file: 2025-09-01-preview/Buckets_Get.json
 */
async function bucketsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.get("myRG", "account1", "pool1", "volume1", "bucket1");
  console.log(result);
}

async function main(): Promise<void> {
  await bucketsGet();
}

main().catch(console.error);
