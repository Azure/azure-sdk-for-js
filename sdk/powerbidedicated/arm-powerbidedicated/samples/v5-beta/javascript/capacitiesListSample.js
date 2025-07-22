// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the Dedicated capacities for the given subscription.
 *
 * @summary lists all the Dedicated capacities for the given subscription.
 * x-ms-original-file: 2021-01-01/listCapacitiesInSubscription.json
 */
async function getDetailsOfACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacities.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getDetailsOfACapacity();
}

main().catch(console.error);
