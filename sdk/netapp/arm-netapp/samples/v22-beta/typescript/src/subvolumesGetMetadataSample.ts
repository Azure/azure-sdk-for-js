// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of the specified subvolume
 *
 * @summary get details of the specified subvolume
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_Metadata.json
 */
async function subvolumesMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.subvolumes.getMetadata(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "subvolume1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await subvolumesMetadata();
}

main().catch(console.error);
