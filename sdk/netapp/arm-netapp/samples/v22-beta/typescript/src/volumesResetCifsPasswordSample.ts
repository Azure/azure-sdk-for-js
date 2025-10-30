// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reset cifs password from volume
 *
 * @summary reset cifs password from volume
 * x-ms-original-file: 2025-07-01-preview/Volumes_ResetCifsPassword.json
 */
async function volumesResetCifsPassword(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.resetCifsPassword("myRG", "account1", "pool1", "volume1");
}

async function main(): Promise<void> {
  await volumesResetCifsPassword();
}

main().catch(console.error);
