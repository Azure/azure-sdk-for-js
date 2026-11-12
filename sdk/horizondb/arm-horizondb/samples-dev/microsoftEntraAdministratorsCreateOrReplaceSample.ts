// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 *
 * @summary creates or replaces a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAdministrators_CreateOrReplace.json
 */
async function createOrReplaceAMicrosoftEntraAdministratorForAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.microsoftEntraAdministrators.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "11111111-1111-1111-1111-111111111111",
    {
      properties: {
        principalName: "database.administrators@contoso.com",
        principalType: "Group",
        tenantId: "22222222-2222-2222-2222-222222222222",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceAMicrosoftEntraAdministratorForAHorizonDBCluster();
}

main().catch(console.error);
