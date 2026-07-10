// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a given registered server.
 *
 * @summary get a given registered server.
 * x-ms-original-file: 2022-09-01/RegisteredServers_Get.json
 */
async function registeredServersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.registeredServers.get(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "080d4133-bdb5-40a0-96a0-71a6057bfe9a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registeredServersGet();
}

main().catch(console.error);
