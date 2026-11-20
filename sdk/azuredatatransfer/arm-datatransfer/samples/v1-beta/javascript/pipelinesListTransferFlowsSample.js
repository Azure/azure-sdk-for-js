// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the storage and messaging transfer flows that use the specified Pipeline, across all subscriptions and tenants that use it. This is the pipeline approver view; it differs from the subscription and resource group list operations, which only return the caller's own transfer flows. Results do not cross clouds; the remote side of each flow is referenced only through remoteTransferFlowResourceId.
 *
 * @summary lists the storage and messaging transfer flows that use the specified Pipeline, across all subscriptions and tenants that use it. This is the pipeline approver view; it differs from the subscription and resource group list operations, which only return the caller's own transfer flows. Results do not cross clouds; the remote side of each flow is referenced only through remoteTransferFlowResourceId.
 * x-ms-original-file: 2026-06-29-preview/listTransferFlowsByPipeline.json
 */
async function listsTheStorageAndMessagingTransferFlowsThatUseAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pipelines.listTransferFlows("testRG", "testPipeline", {
    body: { flows: { status: "Enabled", dataClassTypes: ["Files", "Messaging"] } },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheStorageAndMessagingTransferFlowsThatUseAPipeline();
}

main().catch(console.error);
