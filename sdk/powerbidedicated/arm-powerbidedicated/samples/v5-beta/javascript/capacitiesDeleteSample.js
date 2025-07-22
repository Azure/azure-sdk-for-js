// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Dedicated capacity.
 *
 * @summary deletes the specified Dedicated capacity.
 * x-ms-original-file: 2021-01-01/deleteCapacity.json
 */
async function getDetailsOfACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  await client.capacities.delete("TestRG", "azsdktest");
}

async function main() {
  await getDetailsOfACapacity();
}

main().catch(console.error);
