// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified shared private link resource
 *
 * @summary delete the specified shared private link resource
 * x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Delete.json
 */
async function signalRSharedPrivateLinkResourcesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRSharedPrivateLinkResources.delete(
    "upstream",
    "myResourceGroup",
    "mySignalRService",
  );
}

async function main(): Promise<void> {
  await signalRSharedPrivateLinkResourcesDelete();
}

main().catch(console.error);
