// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to finalizes the relocation of the volume and cleans up the old volume.
 *
 * @summary finalizes the relocation of the volume and cleans up the old volume.
 * x-ms-original-file: 2025-09-01-preview/Volumes_FinalizeRelocation.json
 */
async function volumesFinalizeRelocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.finalizeRelocation("myRG", "account1", "pool1", "volume1");
}

async function main(): Promise<void> {
  await volumesFinalizeRelocation();
}

main().catch(console.error);
