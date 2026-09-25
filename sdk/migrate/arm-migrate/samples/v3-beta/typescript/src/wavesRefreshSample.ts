// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh operation to update wave
 *
 * @summary refresh operation to update wave
 * x-ms-original-file: 2026-06-01-preview/Waves_Refresh_MaximumSet_Gen.json
 */
async function wavesRefreshMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.waves.refresh("rgwaves", "project1", "wave1");
  console.log(result);
}

async function main(): Promise<void> {
  await wavesRefreshMaximumSet();
}

main().catch(console.error);
