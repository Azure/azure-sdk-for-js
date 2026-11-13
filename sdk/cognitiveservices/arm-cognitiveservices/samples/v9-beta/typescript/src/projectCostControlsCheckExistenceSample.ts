// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether a project-owned cost control exists without returning its body.
 *
 * @summary checks whether a project-owned cost control exists without returning its body.
 * x-ms-original-file: 2026-11-15-preview/ProjectCostControl/checkExistence.json
 */
async function checkForABudgetWithoutReturningItsBody(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.projectCostControls.checkExistence(
    "foundry-resource-group",
    "foundry-account",
    "production",
    "project-token-budget",
  );
}

async function main(): Promise<void> {
  await checkForABudgetWithoutReturningItsBody();
}

main().catch(console.error);
