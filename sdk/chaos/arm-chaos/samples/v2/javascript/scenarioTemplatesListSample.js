// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of the scenario templates published by Microsoft.
 *
 * @summary get a list of the scenario templates published by Microsoft.
 * x-ms-original-file: 2026-11-01/ScenarioTemplates_List.json
 */
async function listTheBuiltInScenarioTemplates() {
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scenarioTemplates.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheBuiltInScenarioTemplates();
}

main().catch(console.error);
