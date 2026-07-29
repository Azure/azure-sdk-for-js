// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a custom domain.
 *
 * @summary get a custom domain.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Get.json
 */
async function signalRCustomDomainsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomDomains.get(
    "myResourceGroup",
    "mySignalRService",
    "example",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRCustomDomainsGet();
}

main().catch(console.error);
