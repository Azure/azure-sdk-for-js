// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Sentinel onboarding state
 *
 * @summary Delete Sentinel onboarding state
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/onboardingStates/DeleteSentinelOnboardingState.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteSentinelOnboardingState(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const sentinelOnboardingStateName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sentinelOnboardingStates.delete(
    resourceGroupName,
    workspaceName,
    sentinelOnboardingStateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSentinelOnboardingState();
}

main().catch(console.error);
