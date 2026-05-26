// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of scenario runs.
 *
 * @summary get a list of scenario runs.
 * x-ms-original-file: 2026-05-01-preview/ScenarioRuns_ListAll.json
 */
async function getAListOfScenarioRuns() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scenarioRuns.listAll(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfScenarioRuns();
}

main().catch(console.error);
