// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NeonDatabase
 *
 * @summary create a NeonDatabase
 * x-ms-original-file: 2025-06-23-preview/NeonDatabases_CreateOrUpdate_MaximumSet_Gen.json
 */
async function neonDatabasesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.neonDatabases.createOrUpdate(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    "postgres_main_db",
    {
      properties: {
        entityName: "MainDatabase",
        attributes: [{ name: "on", value: "qzp" }],
        branchId: "sllrohrmwkgzre",
        ownerName: "rjpysakvuicrlwvzcbmp",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await neonDatabasesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
