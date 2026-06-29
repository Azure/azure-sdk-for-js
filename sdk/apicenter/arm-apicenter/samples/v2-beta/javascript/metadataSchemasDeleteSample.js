// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified metadata schema.
 *
 * @summary deletes specified metadata schema.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Delete.json
 */
async function metadataSchemasDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.metadataSchemas.delete("contoso-resources", "contoso", "author");
}

async function main() {
  await metadataSchemasDelete();
}

main().catch(console.error);
