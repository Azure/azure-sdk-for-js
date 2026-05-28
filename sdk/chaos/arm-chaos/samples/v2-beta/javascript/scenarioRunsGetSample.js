// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a scenario run.
 *
 * @summary get a scenario run.
 * x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Get.json
 */
async function getAScenarioRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioRuns.get(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "abcd1234-5678-9012-3456-789012345678",
  );
  console.log(result);
}

async function main() {
  await getAScenarioRun();
}

main().catch(console.error);
