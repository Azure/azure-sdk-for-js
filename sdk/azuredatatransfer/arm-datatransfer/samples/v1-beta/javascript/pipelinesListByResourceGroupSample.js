// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Pipeline resources within the specified resource group.
 *
 * @summary lists all Pipeline resources within the specified resource group.
 * x-ms-original-file: 2026-02-06-preview/listPipelinesByResourceGroup.json
 */
async function getsPipelinesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pipelines.listByResourceGroup("testRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPipelinesInAResourceGroup();
}

main().catch(console.error);
