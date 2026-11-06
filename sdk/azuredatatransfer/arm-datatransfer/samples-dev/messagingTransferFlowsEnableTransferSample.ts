// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts (or resumes) data transfer through the specified messaging transfer flow. The transfer flow must be approved and linked.
 *
 * @summary starts (or resumes) data transfer through the specified messaging transfer flow. The transfer flow must be approved and linked.
 * x-ms-original-file: 2026-06-29-preview/enableTransferMessagingTransferFlow.json
 */
async function startsDataTransferThroughTheMessagingTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.enableTransfer(
    "testRG",
    "testMessagingTransferFlow",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startsDataTransferThroughTheMessagingTransferFlow();
}

main().catch(console.error);
