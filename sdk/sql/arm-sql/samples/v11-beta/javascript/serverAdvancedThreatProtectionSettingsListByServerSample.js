// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of the server's Advanced Threat Protection states.
 *
 * @summary get a list of the server's Advanced Threat Protection states.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvancedThreatProtectionSettingsListByServer.json
 */
async function listTheServerAdvancedThreatProtectionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverAdvancedThreatProtectionSettings.listByServer(
    "threatprotection-4799",
    "threatprotection-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
