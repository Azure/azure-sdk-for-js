// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Wave
 *
 * @summary get a Wave
 * x-ms-original-file: 2026-06-01-preview/Waves_Get_MaximumSet_Gen.json
 */
async function wavesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.waves.get("rgwaves", "project1", "wave1");
  console.log(result);
}

async function main() {
  await wavesGetMaximumSet();
}

main().catch(console.error);
