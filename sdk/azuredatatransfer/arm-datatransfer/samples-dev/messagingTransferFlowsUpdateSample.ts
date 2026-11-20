// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the MessagingTransferFlow resource.
 *
 * @summary updates the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/patchMessagingTransferFlow.json
 */
async function updatesTheMessagingTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.update("testRG", "testMessagingTransferFlow", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheMessagingTransferFlow();
}

main().catch(console.error);
