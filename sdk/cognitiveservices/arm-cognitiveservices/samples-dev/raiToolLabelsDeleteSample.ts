// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified RAI Tool Label associated with the Azure OpenAI account.
 *
 * @summary deletes the specified RAI Tool Label associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiToolLabel.json
 */
async function deleteRaiToolLabel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiToolLabels.delete("resourceGroupName", "accountName", "Web_Search");
}

async function main(): Promise<void> {
  await deleteRaiToolLabel();
}

main().catch(console.error);
