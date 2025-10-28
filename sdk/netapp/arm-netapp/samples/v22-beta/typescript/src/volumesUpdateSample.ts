// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified volume
 *
 * @summary patch the specified volume
 * x-ms-original-file: 2025-07-01-preview/Volumes_Update.json
 */
async function volumesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.update("myRG", "account1", "pool1", "volume1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await volumesUpdate();
}

main().catch(console.error);
