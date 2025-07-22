// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified auto scale v-core.
 *
 * @summary deletes the specified auto scale v-core.
 * x-ms-original-file: 2021-01-01/deleteAutoScaleVCore.json
 */
async function deleteAnAutoScaleVCore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  await client.autoScaleVCores.delete("TestRG", "testvcore");
}

async function main() {
  await deleteAnAutoScaleVCore();
}

main().catch(console.error);
