// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists project-owned cost controls.
 *
 * @summary lists project-owned cost controls.
 * x-ms-original-file: 2026-11-15-preview/ProjectCostControl/list.json
 */
async function listBudgetsOwnedByAProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectCostControls.list(
    "foundry-resource-group",
    "foundry-account",
    "production",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBudgetsOwnedByAProject();
}

main().catch(console.error);
