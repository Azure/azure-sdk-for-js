// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the Documentation for an API specified by its identifier.
 *
 * @summary updates the details of the Documentation for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateDocumentation.json
 */
async function apiManagementUpdateDocumentation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.documentation.update(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "*",
    { content: "content updated", title: "Title updated" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateDocumentation();
}

main().catch(console.error);
