// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to pairs this storage transfer flow with the storage transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them.
 *
 * @summary pairs this storage transfer flow with the storage transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them.
 * x-ms-original-file: 2026-06-29-preview/linkRemoteFlowStorageTransferFlow.json
 */
async function linksTheStorageTransferFlowToItsRemoteStorageTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.storageTransferFlows.linkRemoteFlow(
    "testRG",
    "testStorageTransferFlow",
  );
  console.log(result);
}

async function main() {
  await linksTheStorageTransferFlowToItsRemoteStorageTransferFlow();
}

main().catch(console.error);
