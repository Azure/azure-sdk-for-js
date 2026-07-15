// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action checks if the recovery orchestration plan is eligible for reprotect operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 *
 * @summary this action checks if the recovery orchestration plan is eligible for reprotect operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_ValidateForReprotect_MaximumSet_Gen.json
 */
async function recoveryPlanActionsValidateForReprotectMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.validateForReprotect(
    "nrhlfd",
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

async function main(): Promise<void> {
  await recoveryPlanActionsValidateForReprotectMaximumSet();
}

main().catch(console.error);
