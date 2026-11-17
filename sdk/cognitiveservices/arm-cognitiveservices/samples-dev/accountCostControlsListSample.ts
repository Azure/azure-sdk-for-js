// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists account-owned cost controls.
 *
 * @summary lists account-owned cost controls.
 * x-ms-original-file: 2026-11-15-preview/AccountCostControl/list.json
 */
async function listBudgetsOwnedByAnAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accountCostControls.list(
    "foundry-resource-group",
    "foundry-account",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBudgetsOwnedByAnAccount();
}

main().catch(console.error);
