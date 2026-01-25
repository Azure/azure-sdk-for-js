// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DbSystemShape
 *
 * @summary get a DbSystemShape
 * x-ms-original-file: 2025-09-01/DbSystemShapes_Get_MaximumSet_Gen.json
 */
async function getADbSystemShapeByNameGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystemShapes.get("eastus", "dbsystemshape1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbSystemShape
 *
 * @summary get a DbSystemShape
 * x-ms-original-file: 2025-09-01/DbSystemShapes_Get_MinimumSet_Gen.json
 */
async function getADbSystemShapeByNameGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystemShapes.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbSystemShape
 *
 * @summary get a DbSystemShape
 * x-ms-original-file: 2025-09-01/dbSystemShapes_get.json
 */
async function dbSystemShapesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystemShapes.get("eastus", "EXADATA.X9M");
  console.log(result);
}

async function main(): Promise<void> {
  await getADbSystemShapeByNameGeneratedByMaximumSetRule();
  await getADbSystemShapeByNameGeneratedByMinimumSetRule();
  await dbSystemShapesGet();
}

main().catch(console.error);
