// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cost control.
 *
 * @summary deletes a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/delete.json
 */
async function deleteACostControlConditionally(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.costControls.delete(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
    { ifMatch: '"00000000-0000-0000-0000-000000000002"' },
  );
}

async function main(): Promise<void> {
  await deleteACostControlConditionally();
}

main().catch(console.error);
