// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Triggers a policy evaluation scan for all the resources under the resource group.
 *
 * @summary Triggers a policy evaluation scan for all the resources under the resource group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_TriggerResourceGroupEvaluation.json
 */
async function triggerEvaluationsForAllResourcesInAResourceGroup() {
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyStates.beginTriggerResourceGroupEvaluationAndWait(
    subscriptionId,
    resourceGroupName,
  );
  console.log(result);
}

async function main() {
  await triggerEvaluationsForAllResourcesInAResourceGroup();
}

main().catch(console.error);
