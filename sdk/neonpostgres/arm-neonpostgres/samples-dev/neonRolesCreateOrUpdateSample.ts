// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a NeonRole
 *
 * @summary create a NeonRole
 * x-ms-original-file: 2025-03-01/NeonRoles_CreateOrUpdate_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function neonRolesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.neonRoles.createOrUpdate(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
    {
      properties: {
        entityName: "entity-name",
        attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
        branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
        permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
        isSuperUser: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await neonRolesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
