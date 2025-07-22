// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provisions the specified auto scale v-core based on the configuration specified in the request.
 *
 * @summary provisions the specified auto scale v-core based on the configuration specified in the request.
 * x-ms-original-file: 2021-01-01/createAutoScaleVCore.json
 */
async function createAutoScaleVCore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.autoScaleVCores.create("TestRG", "testvcore", {
    location: "West US",
    properties: {
      capacityLimit: 10,
      capacityObjectId: "a28f00bd-5330-4572-88f1-fa883e074785",
    },
    sku: { name: "AutoScale", capacity: 0, tier: "AutoScale" },
    tags: { testKey: "testValue" },
  });
  console.log(result);
}

async function main() {
  await createAutoScaleVCore();
}

main().catch(console.error);
