// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists state of advanced threat protection settings for a server.
 *
 * @summary lists state of advanced threat protection settings for a server.
 * x-ms-original-file: 2026-01-01-preview/AdvancedThreatProtectionSettingsListByServer.json
 */
async function listStateOfAdvancedThreatProtectionSettingsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.advancedThreatProtectionSettings.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listStateOfAdvancedThreatProtectionSettingsForAServer();
}

main().catch(console.error);
