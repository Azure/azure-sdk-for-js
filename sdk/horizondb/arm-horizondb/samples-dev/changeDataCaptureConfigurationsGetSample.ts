// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a change data capture configuration.
 *
 * @summary gets a change data capture configuration.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureConfigurations_Get.json
 */
async function getAMicrosoftFabricMirroringConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureConfigurations.get(
    "example-resource-group",
    "example-cluster",
    "sales-database",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAMicrosoftFabricMirroringConfiguration();
}

main().catch(console.error);
