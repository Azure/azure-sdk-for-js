// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicated } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the current state of the specified Dedicated capacity.
 *
 * @summary updates the current state of the specified Dedicated capacity.
 * x-ms-original-file: 2021-01-01/updateCapacity.json
 */
async function updateCapacityParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicated(credential, subscriptionId);
  const result = await client.capacities.update("TestRG", "azsdktest", {
    administration: { members: ["azsdktest@microsoft.com", "azsdktest2@microsoft.com"] },
    sku: { name: "A1", tier: "PBIE_Azure" },
    tags: { testKey: "testValue" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the current state of the specified Dedicated capacity.
 *
 * @summary updates the current state of the specified Dedicated capacity.
 * x-ms-original-file: 2021-01-01/updateToGen2.json
 */
async function updateCapacityToGeneration2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicated(credential, subscriptionId);
  const result = await client.capacities.update("TestRG", "azsdktest", {
    mode: "Gen2",
    sku: { name: "A1", tier: "PBIE_Azure" },
    tags: { testKey: "testValue" },
  });
  console.log(result);
}

async function main() {
  await updateCapacityParameters();
  await updateCapacityToGeneration2();
}

main().catch(console.error);
