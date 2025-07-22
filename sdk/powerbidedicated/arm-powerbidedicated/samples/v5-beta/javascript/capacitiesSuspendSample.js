// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to suspends operation of the specified dedicated capacity instance.
 *
 * @summary suspends operation of the specified dedicated capacity instance.
 * x-ms-original-file: 2021-01-01/suspendCapacity.json
 */
async function suspendCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.suspend("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  await suspendCapacity();
}

main().catch(console.error);
