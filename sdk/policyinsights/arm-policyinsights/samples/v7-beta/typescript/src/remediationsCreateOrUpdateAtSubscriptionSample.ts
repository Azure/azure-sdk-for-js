// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a remediation at subscription scope.
 *
 * @summary creates or updates a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateSubscriptionScope.json
 */
async function createRemediationAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.createOrUpdateAtSubscription("storageRemediation", {
    policyAssignmentId:
      "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a remediation at subscription scope.
 *
 * @summary creates or updates a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateSubscriptionScope_AllProperties.json
 */
async function createRemediationAtSubscriptionScopeWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.createOrUpdateAtSubscription("storageRemediation", {
    failureThreshold: { percentage: 0.1 },
    filters: { locations: ["eastus", "westus"] },
    parallelDeployments: 6,
    policyAssignmentId:
      "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
    policyDefinitionReferenceId: "8c8fa9e4",
    resourceCount: 42,
    resourceDiscoveryMode: "ReEvaluateCompliance",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a remediation at subscription scope.
 *
 * @summary creates or updates a remediation at subscription scope.
 * x-ms-original-file: 2024-10-01/Remediations_CreateSubscriptionScope_ResourceIdsFilter.json
 */
async function createRemediationAtSubscriptionScopeWithResourceIdsFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const result = await client.remediations.createOrUpdateAtSubscription("storageRemediation", {
    failureThreshold: { percentage: 0.1 },
    filters: {
      locations: ["eastus", "westus"],
      resourceIds: [
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/res2627/providers/Microsoft.Storage/storageAccounts/sto1125",
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/testcmk3/providers/Microsoft.Storage/storageAccounts/sto3699",
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/res9407/providers/Microsoft.Storage/storageAccounts/sto8596",
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/testcmk3/providers/Microsoft.Storage/storageAccounts/sto6637",
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/res8186/providers/Microsoft.Storage/storageAccounts/sto834",
        "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/resourceGroups/testcmk3/providers/Microsoft.Storage/storageAccounts/sto9174",
      ],
    },
    parallelDeployments: 6,
    policyAssignmentId:
      "/subscriptions/35ee058e-5fa0-414c-8145-3ebb8d09b6e2/providers/microsoft.authorization/policyassignments/b101830944f246d8a14088c5",
    policyDefinitionReferenceId: "8c8fa9e4",
    resourceCount: 42,
    resourceDiscoveryMode: "ExistingNonCompliant",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createRemediationAtSubscriptionScope();
  await createRemediationAtSubscriptionScopeWithAllProperties();
  await createRemediationAtSubscriptionScopeWithResourceIdsFilter();
}

main().catch(console.error);
