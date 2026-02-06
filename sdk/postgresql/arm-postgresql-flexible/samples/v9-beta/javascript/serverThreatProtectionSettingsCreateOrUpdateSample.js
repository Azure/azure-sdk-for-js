// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a server's Advanced Threat Protection settings.
 *
 * @summary creates or updates a server's Advanced Threat Protection settings.
 * x-ms-original-file: 2026-01-01-preview/AdvancedThreatProtectionSettingsCreateOrUpdate.json
 */
async function updateTheAdvancedThreatProtectionSettingsOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.serverThreatProtectionSettings.createOrUpdate(
    "exampleresourcegroup",
    "exampleserver",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await updateTheAdvancedThreatProtectionSettingsOfAServer();
}

main().catch(console.error);
