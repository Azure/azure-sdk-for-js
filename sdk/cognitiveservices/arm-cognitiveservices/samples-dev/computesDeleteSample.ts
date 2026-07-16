// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified compute associated with the Cognitive Services account.
 *
 * @summary deletes the specified compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/DeleteCompute.json
 */
async function deleteCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.computes.delete("rgcognitiveservices", "myAccount", "myCompute");
}

async function main(): Promise<void> {
  await deleteCompute();
}

main().catch(console.error);
