// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the MessagingTransferFlow resource.
 *
 * @summary creates or updates the MessagingTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/createOrUpdateMessagingTransferFlow.json
 */
async function createsOrUpdatesTheMessagingTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.messagingTransferFlows.createOrUpdate(
    "testRG",
    "testMessagingTransferFlow",
    {
      location: "eastus",
      tags: { key1: "value1" },
      properties: {
        pipeline: "testPipeline",
        transferRole: "Source",
        remoteTransferFlowResourceId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/remoteRG/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/remoteMessagingTransferFlow",
        flowProfileName: "flowProfileName",
        messagingDataResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.ServiceBus/namespaces/testnamespace/queues/testqueue",
        messagingOptions: { billingTier: "Standard" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesTheMessagingTransferFlow();
}

main().catch(console.error);
