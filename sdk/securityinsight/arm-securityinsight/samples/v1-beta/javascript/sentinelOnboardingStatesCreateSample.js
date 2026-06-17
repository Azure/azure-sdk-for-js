// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Sentinel onboarding state
 *
 * @summary create Sentinel onboarding state
 * x-ms-original-file: 2025-07-01-preview/onboardingStates/CreateSentinelOnboardingState.json
 */
async function createSentinelOnboardingState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sentinelOnboardingStates.create("myRg", "myWorkspace", "default", {
    sentinelOnboardingStateParameter: { customerManagedKey: false },
  });
  console.log(result);
}

async function main() {
  await createSentinelOnboardingState();
}

main().catch(console.error);
