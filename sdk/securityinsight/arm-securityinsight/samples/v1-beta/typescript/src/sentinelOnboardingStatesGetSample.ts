// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Sentinel onboarding state
 *
 * @summary get Sentinel onboarding state
 * x-ms-original-file: 2025-07-01-preview/onboardingStates/GetSentinelOnboardingState.json
 */
async function getSentinelOnboardingState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sentinelOnboardingStates.get("myRg", "myWorkspace", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getSentinelOnboardingState();
}

main().catch(console.error);
