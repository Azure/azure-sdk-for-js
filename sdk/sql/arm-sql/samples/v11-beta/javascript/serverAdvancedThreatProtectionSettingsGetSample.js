// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a server's Advanced Threat Protection state.
 *
 * @summary get a server's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvancedThreatProtectionSettingsGet.json
 */
async function getAServerAdvancedThreatProtectionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvancedThreatProtectionSettings.get(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getAServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
