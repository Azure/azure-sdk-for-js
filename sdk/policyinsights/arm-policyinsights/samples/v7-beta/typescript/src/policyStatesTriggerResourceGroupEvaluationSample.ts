// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers a policy evaluation scan for all the resources under the resource group.
 *
 * @summary triggers a policy evaluation scan for all the resources under the resource group.
 * x-ms-original-file: 2024-10-01/PolicyStates_TriggerResourceGroupEvaluation.json
 */
async function triggerEvaluationsForAllResourcesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  await client.policyStates.triggerResourceGroupEvaluation(
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "myResourceGroup",
  );
}

async function main(): Promise<void> {
  await triggerEvaluationsForAllResourcesInAResourceGroup();
}

main().catch(console.error);
