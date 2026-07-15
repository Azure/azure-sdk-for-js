// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action performs the necessary readiness check on the recovery orchestration plan to ensure it is in the desired state and eligible for all recovery actions, including all protected resources.
 *
 * @summary this action performs the necessary readiness check on the recovery orchestration plan to ensure it is in the desired state and eligible for all recovery actions, including all protected resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_CheckReadiness_MaximumSet_Gen.json
 */
async function recoveryPlanActionsCheckReadinessMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.recoveryPlanActions.checkReadiness(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
  );
}

async function main(): Promise<void> {
  await recoveryPlanActionsCheckReadinessMaximumSet();
}

main().catch(console.error);
