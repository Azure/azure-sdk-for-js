// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list UpdateRun resources by Fleet
 *
 * @summary list UpdateRun resources by Fleet
 * x-ms-original-file: 2026-02-01-preview/UpdateRuns_ListByFleet.json
 */
async function listsTheUpdateRunResourcesByFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateRuns.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheUpdateRunResourcesByFleet();
}

main().catch(console.error);
