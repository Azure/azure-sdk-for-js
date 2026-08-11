// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to applies the maintenance event immediately.
 *
 * @summary applies the maintenance event immediately.
 * x-ms-original-file: 2026-04-01-preview/MaintenanceEventsApplyNow.json
 */
async function applyMaintenanceImmediatelyForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.applyNow(
    "exampleresourcegroup",
    "exampleserver",
    "XXXX-111",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applyMaintenanceImmediatelyForAServer();
}

main().catch(console.error);
