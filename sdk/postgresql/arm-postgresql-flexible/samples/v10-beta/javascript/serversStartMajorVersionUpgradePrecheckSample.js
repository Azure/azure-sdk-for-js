// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to start Major Version Upgrade Prechecks.
 *
 * @summary start Major Version Upgrade Prechecks.
 * x-ms-original-file: 2026-04-01-preview/ServersStartMajorVersionUpgradePrecheck.json
 */
async function startAMajorVersionUpgradePrecheckValidationForAPostgreSQLFlexibleServer() {
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

async function main() {
  await startAMajorVersionUpgradePrecheckValidationForAPostgreSQLFlexibleServer();
}

main().catch(console.error);
