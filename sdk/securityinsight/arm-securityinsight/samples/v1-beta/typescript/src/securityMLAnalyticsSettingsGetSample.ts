// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Security ML Analytics Settings.
 *
 * @summary gets the Security ML Analytics Settings.
 * x-ms-original-file: 2025-07-01-preview/securityMLAnalyticsSettings/GetAnomalySecurityMLAnalyticsSetting.json
 */
async function getAAnomalySecurityMLAnalyticsSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.securityMLAnalyticsSettings.get(
    "myRg",
    "myWorkspace",
    "myFirstAnomalySettings",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAAnomalySecurityMLAnalyticsSettings();
}

main().catch(console.error);
