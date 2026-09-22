// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a custom domain.
 *
 * @summary delete a custom domain.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Delete.json
 */
async function signalRCustomDomainsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRCustomDomains.delete("myResourceGroup", "mySignalRService", "example");
}

async function main(): Promise<void> {
  await signalRCustomDomainsDelete();
}

main().catch(console.error);
