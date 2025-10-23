// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the specified snapshot within the given volume
 *
 * @summary create the specified snapshot within the given volume
 * x-ms-original-file: 2025-07-01-preview/Snapshots_Create.json
 */
async function snapshotsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshots.create(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "snapshot1",
    { location: "eastus" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotsCreate();
}

main().catch(console.error);
