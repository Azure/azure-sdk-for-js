// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-sovereign";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the Sovereign View resource.
 *
 * @summary creates or updates the Sovereign View resource.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Create.json
 */
async function sovereignViewOperationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.create("ExampleResourceGroup", "ExampleSV", {
    location: "northeurope",
    properties: {
      scope: {
        managementGroups: [
          {
            id: "/providers/Microsoft.Management/managementGroups/ExampleManagementGroup",
            name: "ExampleManagementGroup",
          },
        ],
        subscriptions: [
          { id: "22b62f96-c8d5-4131-97f8-f820a5a3c55f", name: "ExampleSubscription1" },
          { id: "9a7a1a5f-4e73-4a2a-8b4f-3e9e5b2c6d10", name: "ExampleSubscription2" },
        ],
      },
      policyInitiatives: [
        {
          policyInitiativeId:
            "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/providers/Microsoft.Authorization/policySetDefinitions/ExamplePolicySet",
          dimension: "EncryptionAtRest",
          policyVersion: "1.0.0",
          policyAssignmentIds: [
            "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/providers/Microsoft.Authorization/policyAssignments/ExamplePolicyAssignment",
          ],
        },
        {
          policyInitiativeId:
            "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/providers/Microsoft.Authorization/policySetDefinitions/ExampleBusinessContinuityPolicySet",
          dimension: "BusinessContinuity",
          policyVersion: "1.0.0",
          policyAssignmentIds: [
            "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/providers/Microsoft.Authorization/policyAssignments/ExampleBusinessContinuityPolicyAssignment",
          ],
        },
      ],
      regulatoryDocumentName: "SovereignControlBaseline",
      isWorkload: true,
      dimensionSettings: {
        dataResidency: {
          resourceEvaluationScope: "Residency360",
          parameters: { allowedLocations: ["northeurope", "swedencentral"] },
        },
      },
    },
    identity: { type: "SystemAssigned" },
    tags: { tag1: "MCFS" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sovereignViewOperationsCreate();
}

main().catch(console.error);
