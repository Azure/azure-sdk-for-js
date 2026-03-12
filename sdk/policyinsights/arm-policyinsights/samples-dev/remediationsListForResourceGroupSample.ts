// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets all remediations for the subscription.
 *
 * @summary Gets all remediations for the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListResourceGroupScope.json
 */

import type { RemediationsListForResourceGroupOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listRemediationsAtResourceGroupScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all remediations for the subscription.
 *
 * @summary Gets all remediations for the subscription.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListResourceGroupScope_WithQuery.json
 */
async function listRemediationsAtResourceGroupScopeWithQueryParameters(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const resourceGroupName = process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const top = 1;
  const filter =
    "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/myResourceGroup/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5'";
  const options: RemediationsListForResourceGroupOptionalParams = {
    queryOptions: {
      top,
      filter,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForResourceGroup(resourceGroupName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listRemediationsAtResourceGroupScope();
  await listRemediationsAtResourceGroupScopeWithQueryParameters();
}

main().catch(console.error);
