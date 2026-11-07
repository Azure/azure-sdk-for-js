// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a scenario template, described by its newest published version.
 *
 * @summary get a scenario template, described by its newest published version.
 * x-ms-original-file: 2026-11-01/ScenarioTemplates_Get.json
 */
async function getTheLatestVersionOfABuiltInScenarioTemplate() {
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential);
  const result = await client.scenarioTemplates.get("ComputeZoneDown");
  console.log(result);
}

async function main() {
  await getTheLatestVersionOfABuiltInScenarioTemplate();
}

main().catch(console.error);
