// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get detailed information about OpenAI integration rules for a given Elastic monitor resource.
 *
 * @summary get detailed information about OpenAI integration rules for a given Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/OpenAI_Get.json
 */
async function openAIGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await openAIGet();
}

main().catch(console.error);
