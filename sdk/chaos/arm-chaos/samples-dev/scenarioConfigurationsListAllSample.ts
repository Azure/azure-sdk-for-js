// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of scenario definitions.
 *
 * @summary get a list of scenario definitions.
 * x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_ListAll.json
 */
async function getAListOfScenarioConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scenarioConfigurations.listAll(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfScenarioConfigurations();
}

main().catch(console.error);
