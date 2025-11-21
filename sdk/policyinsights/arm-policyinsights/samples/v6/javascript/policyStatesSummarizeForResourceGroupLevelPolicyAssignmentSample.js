// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Summarizes policy states for the resource group level policy assignment.
 *
 * @summary Summarizes policy states for the resource group level policy assignment.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_SummarizeResourceGroupLevelPolicyAssignmentScope.json
 */
async function summarizeAtPolicyAssignmentScope() {
  const policyStatesSummaryResource = "latest";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const policyAssignmentName = "b7a1ca2596524e3ab19597f2";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.summarizeForResourceGroupLevelPolicyAssignment(
    policyStatesSummaryResource,
    subscriptionId,
    resourceGroupName,
    policyAssignmentName,
  );
  console.log(result);
}

async function main() {
  await summarizeAtPolicyAssignmentScope();
}

main().catch(console.error);
