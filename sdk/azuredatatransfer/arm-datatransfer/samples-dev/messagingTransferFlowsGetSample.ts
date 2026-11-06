// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the MessagingTransferFlow resource.
 *
 * @summary gets the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/getMessagingTransferFlow.json
 */
async function getsTheMessagingTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.get("testRG", "testMessagingTransferFlow");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheMessagingTransferFlow();
}

main().catch(console.error);
