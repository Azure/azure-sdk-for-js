// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete account capabilityHost.
 *
 * @summary delete account capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/AccountCapabilityHost/delete.json
 */
async function deleteAccountCapabilityHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.accountCapabilityHosts.delete("test-rg", "account-1", "capabilityHostName");
}

async function main(): Promise<void> {
  await deleteAccountCapabilityHost();
}

main().catch(console.error);
