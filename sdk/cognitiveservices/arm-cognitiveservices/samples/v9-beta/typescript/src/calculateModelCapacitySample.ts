// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to model capacity calculator.
 *
 * @summary model capacity calculator.
 * x-ms-original-file: 2026-01-15-preview/CalculateModelCapacity.json
 */
async function calculateModelCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.calculateModelCapacity({
    model: { name: "gpt-4", format: "OpenAI", version: "0613" },
    skuName: "ProvisionedManaged",
    workloads: [
      { requestParameters: { avgGeneratedTokens: 50, avgPromptTokens: 30 }, requestPerMinute: 10 },
      { requestParameters: { avgGeneratedTokens: 20, avgPromptTokens: 60 }, requestPerMinute: 20 },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await calculateModelCapacity();
}

main().catch(console.error);
