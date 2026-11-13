// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a project-owned cost control and its representation entity tag.
 *
 * @summary gets a project-owned cost control and its representation entity tag.
 * x-ms-original-file: 2026-11-15-preview/ProjectCostControl/get.json
 */
async function getAProjectOwnedBudget() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectCostControls.get(
    "foundry-resource-group",
    "foundry-account",
    "production",
    "project-token-budget",
  );
  console.log(result);
}

async function main() {
  await getAProjectOwnedBudget();
}

main().catch(console.error);
