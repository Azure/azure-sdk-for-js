// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a server's Advanced Threat Protection state
 *
 * @summary Get a server's Advanced Threat Protection state
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/FlexibleServers/stable/2023-12-30/examples/AdvancedThreatProtectionSettingsGet.json
 */

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAServerAdvancedThreatProtectionSettings(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "threatprotection-6852";
  const serverName = "threatprotection-2080";
  const advancedThreatProtectionName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.get(
    resourceGroupName,
    serverName,
    advancedThreatProtectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
