// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Wave
 *
 * @summary delete a Wave
 * x-ms-original-file: 2026-06-01-preview/Waves_Delete_MaximumSet_Gen.json
 */
async function wavesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  await client.waves.delete("rgwaves", "project1", "wave1");
}

async function main(): Promise<void> {
  await wavesDeleteMaximumSet();
}

main().catch(console.error);
