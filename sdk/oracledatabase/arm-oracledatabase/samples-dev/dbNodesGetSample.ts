// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DbNode
 *
 * @summary get a DbNode
 * x-ms-original-file: 2025-09-01/DbNodes_Get_MaximumSet_Gen.json
 */
async function getDbNodeGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbNodes.get("rgopenapi", "cloudvmcluster1", "weraeefrwlkjejfiepwcd");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbNode
 *
 * @summary get a DbNode
 * x-ms-original-file: 2025-09-01/DbNodes_Get_MinimumSet_Gen.json
 */
async function getDbNodeGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbNodes.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a DbNode
 *
 * @summary get a DbNode
 * x-ms-original-file: 2025-09-01/dbNodes_get.json
 */
async function dbNodesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbNodes.get("rg000", "cluster1", "ocid1....aaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await getDbNodeGeneratedByMaximumSetRule();
  await getDbNodeGeneratedByMinimumSetRule();
  await dbNodesGet();
}

main().catch(console.error);
