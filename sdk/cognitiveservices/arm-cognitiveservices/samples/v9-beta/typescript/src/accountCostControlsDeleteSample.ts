// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an account-owned cost control.
 *
 * @summary deletes an account-owned cost control.
 * x-ms-original-file: 2026-11-15-preview/AccountCostControl/delete.json
 */
async function deleteABudgetConditionally(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.accountCostControls.delete(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
    { ifMatch: '"00000000-0000-0000-0000-000000000001"' },
  );
}

async function main(): Promise<void> {
  await deleteABudgetConditionally();
}

main().catch(console.error);
