// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action triggers the test failover operation on the recovery orchestration plan for the qualified resources.
 *
 * @summary this action triggers the test failover operation on the recovery orchestration plan for the qualified resources.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_TestFailover_MaximumSet_Gen.json
 */
async function recoveryPlanActionsTestFailoverMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.testFailover(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    {
      failoverDirection: "FromSpecificLocations",
      failoverRequestProperties: {
        sourceLocations: ["westus"],
        selectedResourceIds: [
          "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/recoveryPlans/samplePlanName/recoveryResources/12345678-9012-3456-7890-123456789012",
        ],
        executionConfigurations: { userConsent: "Allowed" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryPlanActionsTestFailoverMaximumSet();
}

main().catch(console.error);
