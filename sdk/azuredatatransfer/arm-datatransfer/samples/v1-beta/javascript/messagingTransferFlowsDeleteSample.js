// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the MessagingTransferFlow resource.
 *
 * @summary deletes the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/deleteMessagingTransferFlow.json
 */
async function deletesTheMessagingTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.messagingTransferFlows.delete("testRG", "testMessagingTransferFlow");
}

async function main() {
  await deletesTheMessagingTransferFlow();
}

main().catch(console.error);
