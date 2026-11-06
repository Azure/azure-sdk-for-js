// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets messaging transfer flows in a subscription.
 *
 * @summary gets messaging transfer flows in a subscription.
 * x-ms-original-file: 2026-06-29-preview/listMessagingTransferFlowsBySubscription.json
 */
async function listsTheMessagingTransferFlowsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.messagingTransferFlows.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheMessagingTransferFlowsInASubscription();
}

main().catch(console.error);
