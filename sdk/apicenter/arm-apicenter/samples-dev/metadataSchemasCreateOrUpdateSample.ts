// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetadataSchema } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates new or updates existing metadata schema.
 *
 * @summary Creates new or updates existing metadata schema.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/MetadataSchemas_CreateOrUpdate.json
 */
async function metadataSchemasCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const metadataSchemaName = "author";
  const payload: MetadataSchema = {
    properties: {
      schema: '{"type":"string", "title":"Author", pattern: "^[a-zA-Z]+$"}',
      assignedTo: [{ deprecated: true, entity: "api" }],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.metadataSchemas.createOrUpdate(
    resourceGroupName,
    serviceName,
    metadataSchemaName,
    payload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metadataSchemasCreateOrUpdate();
}

main().catch(console.error);
