// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedClient } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the current state of the specified Dedicated capacity.
 *
 * @summary updates the current state of the specified Dedicated capacity.
 * x-ms-original-file: 2021-01-01/updateCapacity.json
 */
async function updateCapacityParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.update("TestRG", "azsdktest", {
    properties: {
      administration: {
        members: ["azsdktest@microsoft.com", "azsdktest2@microsoft.com"],
      },
    },
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
async function updateCapacityToGeneration2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.update("TestRG", "azsdktest", {
    properties: { mode: "Gen2" },
    sku: { name: "A1", tier: "PBIE_Azure" },
    tags: { testKey: "testValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCapacityParameters();
  await updateCapacityToGeneration2();
}

main().catch(console.error);
