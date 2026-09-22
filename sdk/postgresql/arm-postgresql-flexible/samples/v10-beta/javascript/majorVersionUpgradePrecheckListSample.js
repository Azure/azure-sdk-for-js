// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists major version upgrade prechecks for a flexible server.
 *
 * @summary lists major version upgrade prechecks for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MajorVersionUpgradePrecheckListByServer.json
 */
async function listAllMajorVersionUpgradePrecheckValidationsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.majorVersionUpgradePrecheck.list(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllMajorVersionUpgradePrecheckValidationsForAServer();
}

main().catch(console.error);
