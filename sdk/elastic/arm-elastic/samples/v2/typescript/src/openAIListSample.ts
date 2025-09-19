// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring.
 *
 * @summary list all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring.
 * x-ms-original-file: 2025-06-01/OpenAI_List.json
 */
async function openAIList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openAI.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await openAIList();
}

main().catch(console.error);
