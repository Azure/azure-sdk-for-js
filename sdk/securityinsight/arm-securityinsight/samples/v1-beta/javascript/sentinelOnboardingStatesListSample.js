// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Sentinel onboarding states
 *
 * @summary gets all Sentinel onboarding states
 * x-ms-original-file: 2025-07-01-preview/onboardingStates/GetAllSentinelOnboardingStates.json
 */
async function getAllSentinelOnboardingStates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sentinelOnboardingStates.list("myRg", "myWorkspace");
  console.log(result);
}

async function main() {
  await getAllSentinelOnboardingStates();
}

main().catch(console.error);
