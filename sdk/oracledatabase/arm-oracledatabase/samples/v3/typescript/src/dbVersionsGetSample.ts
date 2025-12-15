// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DbVersion
 *
 * @summary get a DbVersion
 * x-ms-original-file: 2025-09-01/DbVersions_Get_MaximumSet_Gen.json
 */
async function dbVersionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbVersions.get("eastus", "23.0.0.0.0");
  console.log(result);
}

async function main(): Promise<void> {
  await dbVersionsGetMaximumSet();
}

main().catch(console.error);
