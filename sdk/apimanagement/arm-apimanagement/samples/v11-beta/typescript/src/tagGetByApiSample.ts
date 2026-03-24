// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get tag associated with the API.
 *
 * @summary get tag associated with the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiTag.json
 */
async function apiManagementGetApiTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.getByApi(
    "rg1",
    "apimService1",
    "59d6bb8f1f7fab13dc67ec9b",
    "59306a29e4bbd510dc24e5f9",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiTag();
}

main().catch(console.error);
