// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get resource change details.
 *
 * @summary get resource change details.
 * x-ms-original-file: 2020-09-01-preview/ResourceChangeDetails.json
 */
async function basicQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourceChangeDetails({
    changeIds: ["53dc0515-b86b-4bc2-979b-e4694ab4a556"],
    resourceIds: [
      "/subscriptions/4d962866-1e3f-47f2-bd18-450c08f914c1/resourceGroups/MyResourceGroup/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await basicQuery();
}

main().catch(console.error);
