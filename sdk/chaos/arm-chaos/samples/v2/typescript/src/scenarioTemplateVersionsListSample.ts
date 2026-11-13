// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of the published versions of a scenario template, including superseded ones.
 *
 * @summary get a list of the published versions of a scenario template, including superseded ones.
 * x-ms-original-file: 2026-11-01/ScenarioTemplateVersions_List.json
 */
async function listThePublishedVersionsOfABuiltInScenarioTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ChaosManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scenarioTemplateVersions.list("ComputeZoneDown")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listThePublishedVersionsOfABuiltInScenarioTemplate();
}

main().catch(console.error);
