// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @summary retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/postListApprovedSchemas.json
 */
async function performsActionRequest() {
  const credential = new DefaultAzureCredential();
  const client = new AzureDataTransferClient(credential);
  const result = await client.azureDataTransfer.listApprovedSchemas({
    direction: "Send",
    pipeline: "test",
  });
  console.log(result);
}

async function main() {
  await performsActionRequest();
}

main().catch(console.error);
