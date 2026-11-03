// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to summarizes policy states for the subscription level policy assignment.
 *
 * @summary summarizes policy states for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/PolicyStates_SummarizeSubscriptionLevelPolicyAssignmentScope.json
 */
async function summarizeAtPolicyAssignmentScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForSubscriptionLevelPolicyAssignment(
    "latest",
    "fffedd8f-ffff-fffd-fffd-fffed2f84852",
    "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await summarizeAtPolicyAssignmentScope();
}

main().catch(console.error);
