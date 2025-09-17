// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate wallet action on Autonomous Database
 *
 * @summary generate wallet action on Autonomous Database
 * x-ms-original-file: 2025-03-01/autonomousDatabase_generateWallet.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function autonomousDatabasesGenerateWallet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.generateWallet("rg000", "databasedb1", {
    generateType: "Single",
    isRegional: false,
    password: "********",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await autonomousDatabasesGenerateWallet();
}

main().catch(console.error);
