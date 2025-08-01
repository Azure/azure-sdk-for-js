// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Gate resources by Fleet
 *
 * @summary list Gate resources by Fleet
 * x-ms-original-file: 2025-04-01-preview/Gates_ListByFleet.json
 */
async function listsTheGatesOfAFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gates.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheGatesOfAFleet();
}

main().catch(console.error);
