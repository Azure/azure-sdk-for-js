// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if specified metadata schema exists.
 *
 * @summary checks if specified metadata schema exists.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Head.json
 */
async function metadataSchemasHead(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.metadataSchemas.head("contoso-resources", "contoso", "author");
}

async function main(): Promise<void> {
  await metadataSchemasHead();
}

main().catch(console.error);
