// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details about the specified auto scale v-core.
 *
 * @summary gets details about the specified auto scale v-core.
 * x-ms-original-file: 2021-01-01/getAutoScaleVCore.json
 */
async function getDetailsOfAnAutoScaleVCore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.autoScaleVCores.get("TestRG", "testvcore");
  console.log(result);
}

async function main() {
  await getDetailsOfAnAutoScaleVCore();
}

main().catch(console.error);
