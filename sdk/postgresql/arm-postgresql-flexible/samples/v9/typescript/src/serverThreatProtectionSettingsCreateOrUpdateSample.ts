// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AdvancedThreatProtectionSettingsModel} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a server's Advanced Threat Protection settings.
 *
 * @summary Creates or updates a server's Advanced Threat Protection settings.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdvancedThreatProtectionSettingsCreateOrUpdate.json
 */
async function updateTheAdvancedThreatProtectionSettingsOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const threatProtectionName = "Default";
  const parameters: AdvancedThreatProtectionSettingsModel = {
    state: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.serverThreatProtectionSettings.beginCreateOrUpdateAndWait(
      resourceGroupName,
      serverName,
      threatProtectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheAdvancedThreatProtectionSettingsOfAServer();
}

main().catch(console.error);
