// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provisions the specified Dedicated capacity based on the configuration specified in the request.
 *
 * @summary provisions the specified Dedicated capacity based on the configuration specified in the request.
 * x-ms-original-file: 2021-01-01/createCapacity.json
 */
async function createCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.create("TestRG", "azsdktest", {
    location: "West US",
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

async function main() {
  await createCapacity();
}

main().catch(console.error);
