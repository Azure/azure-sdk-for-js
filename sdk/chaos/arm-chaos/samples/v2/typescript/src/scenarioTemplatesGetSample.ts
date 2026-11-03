// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a scenario template, described by its newest published version.
 *
 * @summary get a scenario template, described by its newest published version.
 * x-ms-original-file: 2026-11-01/ScenarioTemplates_Get.json
 */
async function getTheLatestVersionOfABuiltInScenarioTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential);
  const result = await client.scenarioTemplates.get("ComputeZoneDown");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLatestVersionOfABuiltInScenarioTemplate();
}

main().catch(console.error);
