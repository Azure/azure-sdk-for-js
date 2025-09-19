// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities.
 *
 * @summary delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities.
 * x-ms-original-file: 2025-06-01/OpenAI_Delete.json
 */
async function openAIDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.openAI.delete("myResourceGroup", "myMonitor", "default");
}

async function main(): Promise<void> {
  await openAIDelete();
}

main().catch(console.error);
