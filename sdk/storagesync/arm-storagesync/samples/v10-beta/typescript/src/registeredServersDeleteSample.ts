// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the given registered server.
 *
 * @summary delete the given registered server.
 * x-ms-original-file: 2022-09-01/RegisteredServers_Delete.json
 */
async function registeredServersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.registeredServers.delete(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "41166691-ab03-43e9-ab3e-0330eda162ac",
  );
}

async function main(): Promise<void> {
  await registeredServersDelete();
}

main().catch(console.error);
