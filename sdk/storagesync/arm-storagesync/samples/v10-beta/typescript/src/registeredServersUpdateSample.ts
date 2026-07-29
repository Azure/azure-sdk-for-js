// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update registered server.
 *
 * @summary update registered server.
 * x-ms-original-file: 2022-09-01/RegisteredServers_Update.json
 */
async function registeredServersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.registeredServers.update(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "080d4133-bdb5-40a0-96a0-71a6057bfe9a",
    { applicationId: "120d4132-bcd5-40a0-96a0-71a6057ebf0c", identity: true },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registeredServersUpdate();
}

main().catch(console.error);
