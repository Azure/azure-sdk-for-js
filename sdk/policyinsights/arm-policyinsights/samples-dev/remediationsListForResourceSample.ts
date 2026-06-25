// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all remediations for a resource.
 *
 * @summary gets all remediations for a resource.
 * x-ms-original-file: 2024-10-01/Remediations_ListResourceScope.json
 */
async function listRemediationsAtIndividualResourceScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all remediations for a resource.
 *
 * @summary gets all remediations for a resource.
 * x-ms-original-file: 2024-10-01/Remediations_ListResourceScope_WithQuery.json
 */
async function listRemediationsAtIndividualResourceScopeWithQueryParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.remediations.listForResource(
    "subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourcegroups/myResourceGroup/providers/microsoft.storage/storageaccounts/storAc1",
    {
      top: 1,
      filter:
        "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5'",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRemediationsAtIndividualResourceScope();
  await listRemediationsAtIndividualResourceScopeWithQueryParameters();
}

main().catch(console.error);
