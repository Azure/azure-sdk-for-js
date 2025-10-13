// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if backup can be performed for given server.
 *
 * @summary validates if backup can be performed for given server.
 * x-ms-original-file: 2024-12-30/ValidateBackup.json
 */
async function validateBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupAndExport.validateBackup("TestGroup", "mysqltestserver");
  console.log(result);
}

async function main(): Promise<void> {
  await validateBackup();
}

main().catch(console.error);
