// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing API version.
 *
 * @summary creates new or updates existing API version.
 * x-ms-original-file: 2024-06-01-preview/ApiVersions_CreateOrUpdate.json
 */
async function apiVersionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiVersions.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    { properties: { title: "2023-01-01", lifecycleStage: "production" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiVersionsCreateOrUpdate();
}

main().catch(console.error);
