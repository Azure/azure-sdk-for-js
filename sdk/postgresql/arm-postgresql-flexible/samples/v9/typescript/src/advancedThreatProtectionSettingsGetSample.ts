// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets state of advanced threat protection settings for a server.
 *
 * @summary Gets state of advanced threat protection settings for a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdvancedThreatProtectionSettingsGet.json
 */
async function getStateOfAdvancedThreatProtectionSettingsForAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const threatProtectionName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.advancedThreatProtectionSettings.get(
    resourceGroupName,
    serverName,
    threatProtectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getStateOfAdvancedThreatProtectionSettingsForAServer();
}

main().catch(console.error);
