// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the cost controls owned by an account.
 *
 * @summary lists the cost controls owned by an account.
 * x-ms-original-file: 2026-09-15-preview/CostControl/list.json
 */
async function listCostControlsWithAllSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.costControls.list("foundry-resource-group", "foundry-account")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCostControlsWithAllSettings();
}

main().catch(console.error);
