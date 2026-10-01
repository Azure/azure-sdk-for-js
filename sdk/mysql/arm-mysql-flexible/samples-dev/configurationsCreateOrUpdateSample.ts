// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a configuration of a server.
 *
 * @summary updates a configuration of a server.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationCreateOrUpdate.json
 */
async function configurationCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.createOrUpdate(
    "TestGroup",
    "testserver",
    "event_scheduler",
    { source: "user-override", value: "off" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationCreateOrUpdate();
}

main().catch(console.error);
