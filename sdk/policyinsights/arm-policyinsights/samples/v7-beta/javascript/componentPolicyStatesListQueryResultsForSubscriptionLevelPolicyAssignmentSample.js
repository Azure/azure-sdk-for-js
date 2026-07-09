// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queries component policy states for the subscription level policy assignment.
 *
 * @summary queries component policy states for the subscription level policy assignment.
 * x-ms-original-file: 2024-10-01/ComponentPolicyStates_QuerySubscriptionLevelPolicyAssignmentScope.json
 */
async function queryLatestAtSubscriptionLevelPolicyAssignmentScope() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result =
    await client.componentPolicyStates.listQueryResultsForSubscriptionLevelPolicyAssignment(
      "fffedd8f-ffff-fffd-fffd-fffed2f84852",
      "ec8f9645-8ecb-4abb-9c0b-5292f19d4003",
      "latest",
    );
  console.log(result);
}

async function main() {
  await queryLatestAtSubscriptionLevelPolicyAssignmentScope();
}

main().catch(console.error);
