// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a subvolume in the path or clones the subvolume mentioned in the parentPath
 *
 * @summary creates a subvolume in the path or clones the subvolume mentioned in the parentPath
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_Create.json
 */
async function subvolumesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.subvolumes.create(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "subvolume1",
    { properties: { path: "/subvolumePath" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await subvolumesCreate();
}

main().catch(console.error);
