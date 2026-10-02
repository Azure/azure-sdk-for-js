// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Wave
 *
 * @summary delete a Wave
 * x-ms-original-file: 2026-06-01-preview/Waves_Delete_MaximumSet_Gen.json
 */
async function wavesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  await client.waves.delete("rgwaves", "project1", "wave1");
}

async function main() {
  await wavesDeleteMaximumSet();
}

main().catch(console.error);
