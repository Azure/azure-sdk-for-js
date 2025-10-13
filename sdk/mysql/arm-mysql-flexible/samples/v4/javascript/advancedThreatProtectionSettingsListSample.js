// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of server's Advanced Threat Protection states.
 *
 * @summary gets a list of server's Advanced Threat Protection states.
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsList.json
 */
async function getListOfServerAdvancedThreatProtectionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.advancedThreatProtectionSettings.list(
    "threatprotection-6852",
    "threatprotection-2080",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getListOfServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
