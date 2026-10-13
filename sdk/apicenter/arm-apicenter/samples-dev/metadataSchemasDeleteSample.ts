// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified metadata schema.
 *
 * @summary deletes specified metadata schema.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Delete.json
 */
async function metadataSchemasDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.metadataSchemas.delete("contoso-resources", "contoso", "author");
}

async function main(): Promise<void> {
  await metadataSchemasDelete();
}

main().catch(console.error);
