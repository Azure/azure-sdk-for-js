// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring.
 *
 * @summary create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring.
 * x-ms-original-file: 2025-06-01/OpenAI_CreateOrUpdate.json
 */
async function openAICreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.createOrUpdate("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await openAICreateOrUpdate();
}

main().catch(console.error);
