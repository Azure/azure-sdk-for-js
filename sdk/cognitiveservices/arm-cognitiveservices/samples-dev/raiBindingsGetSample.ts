// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets one RAI binding.
 *
 * @summary gets one RAI binding.
 * x-ms-original-file: 2026-09-15-preview/GetRaiBinding.json
 */
async function getARAIBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBindings.get("resource-group", "safety-account", "chat-guard");
  console.log(result);
}

async function main(): Promise<void> {
  await getARAIBinding();
}

main().catch(console.error);
