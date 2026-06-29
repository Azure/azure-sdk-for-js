// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing metadata schema.
 *
 * @summary creates new or updates existing metadata schema.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_CreateOrUpdate.json
 */
async function metadataSchemasCreateOrUpdate(): Promise<void> {
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

async function main(): Promise<void> {
  await metadataSchemasCreateOrUpdate();
}

main().catch(console.error);
