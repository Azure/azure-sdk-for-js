// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a DbSystem
 *
 * @summary update a DbSystem
 * x-ms-original-file: 2026-06-01/DbSystems_Update_MaximumSet_Gen.json
 */
async function dbSystemsUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystems.update("rgopenapi", "resource1", {
    zones: ["example"],
    tags: { key7827: "example" },
    properties: { source: "None" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dbSystemsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
