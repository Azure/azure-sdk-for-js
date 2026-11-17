// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a project-owned cost control.
 *
 * @summary deletes a project-owned cost control.
 * x-ms-original-file: 2026-11-15-preview/ProjectCostControl/delete.json
 */
async function deleteABudgetConditionally() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.projectCostControls.delete(
    "foundry-resource-group",
    "foundry-account",
    "production",
    "project-token-budget",
    { ifMatch: '"00000000-0000-0000-0000-000000000001"' },
  );
}

async function main() {
  await deleteABudgetConditionally();
}

main().catch(console.error);
