// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the MessagingTransferFlow resource.
 *
 * @summary deletes the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/deleteMessagingTransferFlow.json
 */
async function deletesTheMessagingTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.messagingTransferFlows.delete("testRG", "testMessagingTransferFlow");
}

async function main(): Promise<void> {
  await deletesTheMessagingTransferFlow();
}

main().catch(console.error);
