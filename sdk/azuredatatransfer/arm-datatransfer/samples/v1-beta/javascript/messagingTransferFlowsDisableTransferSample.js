// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops data transfer through the specified messaging transfer flow.
 *
 * @summary stops data transfer through the specified messaging transfer flow.
 * x-ms-original-file: 2026-06-29-preview/disableTransferMessagingTransferFlow.json
 */
async function stopsDataTransferThroughTheMessagingTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.disableTransfer(
    "testRG",
    "testMessagingTransferFlow",
  );
  console.log(result);
}

async function main() {
  await stopsDataTransferThroughTheMessagingTransferFlow();
}

main().catch(console.error);
