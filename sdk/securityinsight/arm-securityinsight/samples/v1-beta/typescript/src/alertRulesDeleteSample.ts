// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the alert rule.
 *
 * @summary delete the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/DeleteAlertRule.json
 */
async function deleteAnAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.alertRules.delete("myRg", "myWorkspace", "73e01a99-5cd7-4139-a149-9f2736ff2ab5");
}

async function main(): Promise<void> {
  await deleteAnAlertRule();
}

main().catch(console.error);
