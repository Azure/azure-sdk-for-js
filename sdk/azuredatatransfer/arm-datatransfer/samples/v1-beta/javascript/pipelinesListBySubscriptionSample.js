// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Pipeline resources within the current subscription.
 *
 * @summary lists all Pipeline resources within the current subscription.
 * x-ms-original-file: 2026-02-06-preview/listPipelinesBySubscription.json
 */
async function getsPipelinesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pipelines.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPipelinesInASubscription();
}

main().catch(console.error);
