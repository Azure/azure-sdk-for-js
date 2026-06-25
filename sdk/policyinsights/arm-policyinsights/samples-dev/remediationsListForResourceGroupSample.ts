// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all remediations for the subscription.
 *
 * @summary gets all remediations for the subscription.
 * x-ms-original-file: 2024-10-01/Remediations_ListResourceGroupScope.json
 */
async function listRemediationsAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all remediations for the subscription.
 *
 * @summary gets all remediations for the subscription.
 * x-ms-original-file: 2024-10-01/Remediations_ListResourceGroupScope_WithQuery.json
 */
async function listRemediationsAtResourceGroupScopeWithQueryParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listForResourceGroup("myResourceGroup", {
    top: 1,
    filter:
      "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/myResourceGroup/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRemediationsAtResourceGroupScope();
  await listRemediationsAtResourceGroupScopeWithQueryParameters();
}

main().catch(console.error);
