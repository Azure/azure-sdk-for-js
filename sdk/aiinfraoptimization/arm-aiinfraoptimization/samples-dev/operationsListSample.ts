// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIInfraOptimizationClient } from "@azure/arm-aiinfraoptimization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-06-01-preview/Operations_List.json
 */
async function listTheOperationsForTheMicrosoftAIInfraOptimizationResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AIInfraOptimizationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheOperationsForTheMicrosoftAIInfraOptimizationResourceProvider();
}

main().catch(console.error);
