// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an account-owned cost control and its representation entity tag.
 *
 * @summary gets an account-owned cost control and its representation entity tag.
 * x-ms-original-file: 2026-11-15-preview/AccountCostControl/get.json
 */
async function getAnAccountOwnedBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountCostControls.get(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAccountOwnedBudget();
}

main().catch(console.error);
