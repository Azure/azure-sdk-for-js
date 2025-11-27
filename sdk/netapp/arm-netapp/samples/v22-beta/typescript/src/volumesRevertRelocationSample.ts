// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume.
 *
 * @summary reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume.
 * x-ms-original-file: 2025-09-01-preview/Volumes_RevertRelocation.json
 */
async function volumesRevertRelocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.revertRelocation("myRG", "account1", "pool1", "volume1");
}

async function main(): Promise<void> {
  await volumesRevertRelocation();
}

main().catch(console.error);
