// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action triggers the reprotect operation on the recovery orchestration plan for the qualified resources.
 *
 * @summary this action triggers the reprotect operation on the recovery orchestration plan for the qualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_Reprotect_MaximumSet_Gen.json
 */
async function recoveryPlanActionsReprotectMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.reprotect(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    {
      body: {
        reprotectRequestProperties: {
          selectedResourceIds: [
            "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/recoveryPlans/samplePlanName/recoveryResources/12345678-9012-3456-7890-123456789012",
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await recoveryPlanActionsReprotectMaximumSet();
}

main().catch(console.error);
