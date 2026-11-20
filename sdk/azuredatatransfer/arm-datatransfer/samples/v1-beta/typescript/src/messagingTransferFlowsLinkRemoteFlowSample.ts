// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to pairs this messaging transfer flow with the messaging transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them.
 *
 * @summary pairs this messaging transfer flow with the messaging transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them.
 * x-ms-original-file: 2026-06-29-preview/linkRemoteFlowMessagingTransferFlow.json
 */
async function linksTheMessagingTransferFlowToItsRemoteMessagingTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.linkRemoteFlow(
    "testRG",
    "testMessagingTransferFlow",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linksTheMessagingTransferFlowToItsRemoteMessagingTransferFlow();
}

main().catch(console.error);
