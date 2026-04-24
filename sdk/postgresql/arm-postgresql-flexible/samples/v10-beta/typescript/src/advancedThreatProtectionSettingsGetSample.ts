// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets state of advanced threat protection settings for a server.
 *
 * @summary gets state of advanced threat protection settings for a server.
 * x-ms-original-file: 2026-01-01-preview/AdvancedThreatProtectionSettingsGet.json
 */
async function getStateOfAdvancedThreatProtectionSettingsForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.get(
    "exampleresourcegroup",
    "exampleserver",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getStateOfAdvancedThreatProtectionSettingsForAServer();
}

main().catch(console.error);
