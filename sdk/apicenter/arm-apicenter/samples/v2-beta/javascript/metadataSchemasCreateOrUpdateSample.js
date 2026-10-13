// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new or updates existing metadata schema.
 *
 * @summary creates new or updates existing metadata schema.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_CreateOrUpdate.json
 */
async function metadataSchemasCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.metadataSchemas.createOrUpdate(
    "contoso-resources",
    "contoso",
    "author",
    {
      properties: {
        assignedTo: [{ entity: "api", deprecated: true }],
        schema: '{"type":"string", "title":"Author", pattern: "^[a-zA-Z]+$"}',
      },
    },
  );
  console.log(result);
}

async function main() {
  await metadataSchemasCreateOrUpdate();
}

main().catch(console.error);
