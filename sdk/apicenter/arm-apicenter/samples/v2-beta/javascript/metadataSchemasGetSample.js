// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of the metadata schema.
 *
 * @summary returns details of the metadata schema.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Get.json
 */
async function metadataSchemasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.metadataSchemas.get("contoso-resources", "contoso", "lastName");
  console.log(result);
}

async function main() {
  await metadataSchemasGet();
}

main().catch(console.error);
