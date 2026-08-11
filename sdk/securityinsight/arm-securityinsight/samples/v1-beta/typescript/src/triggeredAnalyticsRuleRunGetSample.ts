// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the triggered analytics rule run.
 *
 * @summary gets the triggered analytics rule run.
 * x-ms-original-file: 2025-07-01-preview/triggeredAnalyticsRuleRuns/triggeredAnalyticsRuleRun_Get.json
 */
async function triggeredAnalyticsRuleRunGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.triggeredAnalyticsRuleRun.get(
    "myRg",
    "myWorkspace",
    "65360bb0-8986-4ade-a89d-af3cf44d28aa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggeredAnalyticsRuleRunGet();
}

main().catch(console.error);
