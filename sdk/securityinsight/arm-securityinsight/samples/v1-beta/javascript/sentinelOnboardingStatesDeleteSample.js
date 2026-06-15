// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Sentinel onboarding state
 *
 * @summary delete Sentinel onboarding state
 * x-ms-original-file: 2025-07-01-preview/onboardingStates/DeleteSentinelOnboardingState.json
 */
async function deleteSentinelOnboardingState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.sentinelOnboardingStates.delete("myRg", "myWorkspace", "default");
}

async function main() {
  await deleteSentinelOnboardingState();
}

main().catch(console.error);
