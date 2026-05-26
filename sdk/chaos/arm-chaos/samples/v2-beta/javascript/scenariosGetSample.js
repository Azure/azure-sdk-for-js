// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a scenario.
 *
 * @summary get a scenario.
 * x-ms-original-file: 2026-05-01-preview/Scenarios_Get.json
 */
async function getAScenario() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.get("exampleRG", "exampleWorkspace", "zoneDownScenario");
  console.log(result);
}

async function main() {
  await getAScenario();
}

main().catch(console.error);
