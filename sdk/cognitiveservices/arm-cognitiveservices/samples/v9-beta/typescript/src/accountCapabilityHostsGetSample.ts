// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get account capabilityHost.
 *
 * @summary get account capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/AccountCapabilityHost/get.json
 */
async function getAccountCapabilityHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountCapabilityHosts.get(
    "test-rg",
    "account-1",
    "capabilityHostName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccountCapabilityHost();
}

main().catch(console.error);
