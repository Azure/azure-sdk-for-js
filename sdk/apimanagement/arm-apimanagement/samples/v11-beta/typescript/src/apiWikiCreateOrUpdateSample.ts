// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Wiki for an API or updates an existing one.
 *
 * @summary creates a new Wiki for an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiWiki.json
 */
async function apiManagementCreateApiWiki(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiWiki.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    { documents: [{ documentationId: "docId1" }, { documentationId: "docId2" }] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiWiki();
}

main().catch(console.error);
