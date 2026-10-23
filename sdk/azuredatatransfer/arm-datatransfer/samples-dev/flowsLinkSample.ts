// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to links the specified flow.
 *
 * @summary links the specified flow.
 * x-ms-original-file: 2026-02-06-preview/linkFlow.json
 */
async function linksTheSpecifiedFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.link("testRG", "testConnection", "testFlow", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection/flows/testFlow",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await linksTheSpecifiedFlow();
}

main().catch(console.error);
