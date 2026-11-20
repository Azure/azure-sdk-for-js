// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the MessagingTransferFlow resource.
 *
 * @summary gets the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/getMessagingTransferFlow.json
 */
async function getsTheMessagingTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.get("testRG", "testMessagingTransferFlow");
  console.log(result);
}

async function main() {
  await getsTheMessagingTransferFlow();
}

main().catch(console.error);
