// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action adds or updates the resources to be included in the recovery orchestration plan.
 *
 * @summary this action adds or updates the resources to be included in the recovery orchestration plan.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_UpdateResources_MaximumSet_Gen.json
 */
async function recoveryPlanActionsUpdateResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.updateResources(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    {
      resourcesToUpdate: [
        {
          properties: {
            recoveryResourceUniqueId: "e2a7b8d1-4c3f-4e2b-9a1c-7f6e2d8b5c4a",
            selectedProtectionSolutionType: "AzureNative",
            selectedProtectionSolutionSetting: { protectionSolutionType: "AzureNative" },
            recoveryGroupId: "11111111-1111-1111-1111-123456789012",
            associatedIdentity: {
              type: "UserAssigned",
              userAssignedIdentity:
                "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
            },
            inclusionState: "Included",
          },
        },
      ],
      resourcesToRemove: [
        "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/recoveryPlans/samplePlanName/recoveryResources/12345678-9012-3456-7890-123456789012",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsUpdateResourcesMaximumSet();
}

main().catch(console.error);
