// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the tuning options of a server.
 *
 * @summary gets the tuning options of a server.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsGet.json
 */
async function getTheTuningOptionsOfAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningOptions.get("exampleresourcegroup", "exampleserver", "index");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheTuningOptionsOfAServer();
}

main().catch(console.error);
