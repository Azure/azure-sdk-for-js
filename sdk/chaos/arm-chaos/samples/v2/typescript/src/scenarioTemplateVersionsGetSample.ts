// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a single published version of a scenario template.
 *
 * @summary get a single published version of a scenario template.
 * x-ms-original-file: 2026-11-01/ScenarioTemplateVersions_Get.json
 */
async function getASpecificVersionOfABuiltInScenarioTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential);
  const result = await client.scenarioTemplateVersions.get("ComputeZoneDown", "1.2");
  console.log(result);
}

async function main(): Promise<void> {
  await getASpecificVersionOfABuiltInScenarioTemplate();
}

main().catch(console.error);
