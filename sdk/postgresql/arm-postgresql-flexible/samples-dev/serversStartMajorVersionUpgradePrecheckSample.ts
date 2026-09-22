// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start Major Version Upgrade Prechecks.
 *
 * @summary start Major Version Upgrade Prechecks.
 * x-ms-original-file: 2026-04-01-preview/ServersStartMajorVersionUpgradePrecheck.json
 */
async function startAMajorVersionUpgradePrecheckValidationForAPostgreSQLFlexibleServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.startMajorVersionUpgradePrecheck(
    "exampleresourcegroup",
    "exampleserver",
    { targetVersion: "18" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startAMajorVersionUpgradePrecheckValidationForAPostgreSQLFlexibleServer();
}

main().catch(console.error);
