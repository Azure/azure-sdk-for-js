// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDB administrator or updates an existing administrator.
 *
 * @summary creates a new HorizonDB administrator or updates an existing administrator.
 * x-ms-original-file: 2026-05-01-preview/Administrators_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDBAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbAdministrators.createOrUpdate(
    "exampleresourcegroup",
    "examplecluster",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    {
      properties: {
        principalName: "admin@contoso.com",
        principalType: "User",
        tenantId: "11111111-2222-3333-4444-555555555555",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAHorizonDBAdministrator();
}

main().catch(console.error);
