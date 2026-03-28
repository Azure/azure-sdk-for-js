// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the Security ML Analytics Settings.
 *
 * @summary delete the Security ML Analytics Settings.
 * x-ms-original-file: 2025-07-01-preview/securityMLAnalyticsSettings/DeleteSecurityMLAnalyticsSetting.json
 */
async function deleteASecurityMLAnalyticsSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.securityMLAnalyticsSettings.delete(
    "myRg",
    "myWorkspace",
    "f209187f-1d17-4431-94af-c141bf5f23db",
  );
}

async function main(): Promise<void> {
  await deleteASecurityMLAnalyticsSettings();
}

main().catch(console.error);
