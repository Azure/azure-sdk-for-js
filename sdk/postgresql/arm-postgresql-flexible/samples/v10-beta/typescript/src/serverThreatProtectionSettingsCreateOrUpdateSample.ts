// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a server's Advanced Threat Protection settings.
 *
 * @summary creates or updates a server's Advanced Threat Protection settings.
 * x-ms-original-file: 2026-01-01-preview/AdvancedThreatProtectionSettingsCreateOrUpdate.json
 */
async function updateTheAdvancedThreatProtectionSettingsOfAServer(): Promise<void> {
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

async function main(): Promise<void> {
  await updateTheAdvancedThreatProtectionSettingsOfAServer();
}

main().catch(console.error);
