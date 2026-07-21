// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers analytics rule run
 *
 * @summary triggers analytics rule run
 * x-ms-original-file: 2025-07-01-preview/triggeredAnalyticsRuleRuns/triggerRuleRun_Post.json
 */
async function triggerRuleRunPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRule.triggerRuleRun(
    "myRg",
    "myWorkspace",
    "65360bb0-8986-4ade-a89d-af3cf44d28aa",
    { executionTimeUtc: new Date("2022-12-22T15:37:03.074Z") },
  );
  console.log(result);
}

async function main() {
  await triggerRuleRunPost();
}

main().catch(console.error);
