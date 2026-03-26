// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the content filters associated with the Azure OpenAI account.
 *
 * @summary gets the content filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/ListEncryptionScopes.json
 */
async function listEncryptionScopes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.encryptionScopes.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEncryptionScopes();
}

main().catch(console.error);
