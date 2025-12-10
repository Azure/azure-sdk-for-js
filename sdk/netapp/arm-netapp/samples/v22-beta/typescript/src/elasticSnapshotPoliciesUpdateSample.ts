// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ElasticSnapshotPolicy
 *
 * @summary update a ElasticSnapshotPolicy
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshotPolicies_Update.json
 */
async function elasticSnapshotPoliciesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticSnapshotPolicies.update(
    "myRG",
    "account1",
    "snapshotPolicyName",
    {
      properties: {
        policyStatus: "Enabled",
        hourlySchedule: { snapshotsToKeep: 2, minute: 50 },
        dailySchedule: { snapshotsToKeep: 4, hour: 14, minute: 30 },
        weeklySchedule: {
          snapshotsToKeep: 3,
          days: ["Wednesday"],
          hour: 14,
          minute: 45,
        },
        monthlySchedule: {
          snapshotsToKeep: 5,
          daysOfMonth: [10, 11, 12],
          hour: 14,
          minute: 15,
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSnapshotPoliciesUpdate();
}

main().catch(console.error);
