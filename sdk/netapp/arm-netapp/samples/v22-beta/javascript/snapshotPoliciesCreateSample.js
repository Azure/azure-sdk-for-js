// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a snapshot policy
 *
 * @summary create a snapshot policy
 * x-ms-original-file: 2025-07-01-preview/SnapshotPolicies_Create.json
 */
async function snapshotPoliciesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshotPolicies.create("myRG", "account1", "snapshotPolicyName", {
    location: "eastus",
    properties: {
      dailySchedule: { hour: 14, minute: 30, snapshotsToKeep: 4 },
      enabled: true,
      hourlySchedule: { minute: 50, snapshotsToKeep: 2 },
      monthlySchedule: {
        daysOfMonth: "10,11,12",
        hour: 14,
        minute: 15,
        snapshotsToKeep: 5,
      },
      weeklySchedule: {
        day: "Wednesday",
        hour: 14,
        minute: 45,
        snapshotsToKeep: 3,
      },
    },
  });
  console.log(result);
}

async function main() {
  await snapshotPoliciesCreate();
}

main().catch(console.error);
