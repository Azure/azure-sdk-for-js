// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the current state of the specified auto scale v-core.
 *
 * @summary updates the current state of the specified auto scale v-core.
 * x-ms-original-file: 2021-01-01/updateAutoScaleVCore.json
 */
async function updateAutoScaleVCoreParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.autoScaleVCores.update("TestRG", "testvcore", {
    properties: { capacityLimit: 20 },
    sku: { name: "AutoScale", capacity: 0, tier: "AutoScale" },
    tags: { testKey: "testValue" },
  });
  console.log(result);
}

async function main() {
  await updateAutoScaleVCoreParameters();
}

main().catch(console.error);
