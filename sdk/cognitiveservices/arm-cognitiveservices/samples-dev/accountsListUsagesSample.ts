// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-03-01/GetUsages.json
 */
async function getUsages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

async function main(): Promise<void> {
  await getUsages();
}

main().catch(console.error);
