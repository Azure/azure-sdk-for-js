// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the schema specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the schema specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadApiSchema.json
 */
async function apiManagementHeadApiSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiSchema.getEntityTag(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "ec12520d-9d48-4e7b-8f39-698ca2ac63f1",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadApiSchema();
}

main().catch(console.error);
