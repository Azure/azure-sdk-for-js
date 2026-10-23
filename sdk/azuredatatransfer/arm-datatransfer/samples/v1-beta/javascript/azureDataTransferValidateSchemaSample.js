// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @summary validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/postValidateSchema.json
 */
async function performsActionRequest() {
  const credential = new DefaultAzureCredential();
  const client = new AzureDataTransferClient(credential);
  const result = await client.azureDataTransfer.validateSchema({ name: "schema.xml" });
  console.log(result);
}

async function main() {
  await performsActionRequest();
}

main().catch(console.error);
