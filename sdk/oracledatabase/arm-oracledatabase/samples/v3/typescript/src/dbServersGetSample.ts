// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DbServer
 *
 * @summary get a DbServer
 * x-ms-original-file: 2025-09-01/DbServers_Get_MaximumSet_Gen.json
 */
async function getDbServerByParentGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbServers.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbServer
 *
 * @summary get a DbServer
 * x-ms-original-file: 2025-09-01/DbServers_Get_MinimumSet_Gen.json
 */
async function getDbServerByParentGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbServers.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbServer
 *
 * @summary get a DbServer
 * x-ms-original-file: 2025-09-01/dbServers_get.json
 */
async function dbServersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbServers.get("rg000", "infra1", "ocid1....aaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await getDbServerByParentGeneratedByMaximumSetRule();
  await getDbServerByParentGeneratedByMinimumSetRule();
  await dbServersGet();
}

main().catch(console.error);
