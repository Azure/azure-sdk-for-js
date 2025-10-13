// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a configuration of a server.
 *
 * @summary updates a configuration of a server.
 * x-ms-original-file: 2024-12-30/ConfigurationUpdate.json
 */
async function updateAUserConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.update("testrg", "testserver", "event_scheduler", {
    properties: { source: "user-override", value: "on" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAUserConfiguration();
}

main().catch(console.error);
