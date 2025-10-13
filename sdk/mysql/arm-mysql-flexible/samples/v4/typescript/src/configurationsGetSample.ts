// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a configuration of server.
 *
 * @summary gets information about a configuration of server.
 * x-ms-original-file: 2024-12-30/ConfigurationGet.json
 */
async function getAConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.get("TestGroup", "testserver", "event_scheduler");
  console.log(result);
}

async function main(): Promise<void> {
  await getAConfiguration();
}

main().catch(console.error);
