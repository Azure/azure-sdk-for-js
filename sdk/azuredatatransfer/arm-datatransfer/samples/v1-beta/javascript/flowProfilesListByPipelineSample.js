// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all FlowProfiles under a given Pipeline.
 *
 * @summary lists all FlowProfiles under a given Pipeline.
 * x-ms-original-file: 2026-02-06-preview/listFlowProfilesByPipeline.json
 */
async function getsFlowsInAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.flowProfiles.listByPipeline("testRG", "testPipeline")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsFlowsInAConnection();
}

main().catch(console.error);
