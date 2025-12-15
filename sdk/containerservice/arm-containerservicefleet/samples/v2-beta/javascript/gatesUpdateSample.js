// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Gate
 *
 * @summary update a Gate
 * x-ms-original-file: 2025-08-01-preview/Gates_Update.json
 */
async function updatesAGateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.update(
    "rg1",
    "fleet1",
    "12345678-910a-bcde-f000-000000000000",
    { properties: { state: "Completed" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Gate
 *
 * @summary update a Gate
 * x-ms-original-file: 2025-08-01-preview/Gates_Update_MaximumSet_Gen.json
 */
async function gatesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A5DFED4F-5511-4753-B6C8-3ACC54B370E3";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.update(
    "rgfleets",
    "fleet-1",
    "12345678-910a-bcde-f000-000000000000",
    { properties: { state: "Pending" } },
    { ifMatch: "jqongzwjguenncptggiqzxxycakgrj", ifNoneMatch: "fsyp" },
  );
  console.log(result);
}

async function main() {
  await updatesAGateResource();
  await gatesUpdateMaximumSet();
}

main().catch(console.error);
