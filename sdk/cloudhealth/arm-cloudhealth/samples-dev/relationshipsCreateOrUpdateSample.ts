// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Relationship
 *
 * @summary create a Relationship
 * x-ms-original-file: 2026-05-01-preview/Relationships_CreateOrUpdate.json
 */
async function relationshipsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.relationships.createOrUpdate(
    "online-store-rg",
    "online-store",
    "web-frontend-to-orders-api",
    {
      properties: {
        displayName: "Web Frontend depends on Orders API",
        parentEntityName: "web-frontend",
        childEntityName: "orders-api",
        tags: { environment: "production", team: "online-store" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relationshipsCreateOrUpdate();
}

main().catch(console.error);
