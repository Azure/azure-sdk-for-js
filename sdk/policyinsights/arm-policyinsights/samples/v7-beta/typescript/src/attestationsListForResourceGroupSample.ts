// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all attestations for the resource group.
 *
 * @summary gets all attestations for the resource group.
 * x-ms-original-file: 2024-10-01/Attestations_ListResourceGroupScope.json
 */
async function listAttestationsAtResourceGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attestations.listForResourceGroup("myRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all attestations for the resource group.
 *
 * @summary gets all attestations for the resource group.
 * x-ms-original-file: 2024-10-01/Attestations_ListResourceGroupScope_WithQuery.json
 */
async function listAttestationsAtResourceGroupScopeWithQueryParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attestations.listForResourceGroup("myRg", {
    queryOptions: {
      top: 1,
      filter:
        "PolicyAssignmentId eq '/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5' AND PolicyDefinitionReferenceId eq '0b158b46-ff42-4799-8e39-08a5c23b4551'",
    },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAttestationsAtResourceGroupScope();
  await listAttestationsAtResourceGroupScopeWithQueryParameters();
}

main().catch(console.error);
