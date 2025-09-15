// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch a snapshot policy
 *
 * @summary Patch a snapshot policy
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/SnapshotPolicies_Update.json
 */

import { SnapshotPolicyPatch, NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function snapshotPoliciesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const snapshotPolicyName = "snapshotPolicyName";
  const body: SnapshotPolicyPatch = {
    dailySchedule: { hour: 14, minute: 30, snapshotsToKeep: 4 },
    enabled: true,
    hourlySchedule: { minute: 50, snapshotsToKeep: 2 },
    location: "eastus",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.snapshotPolicies.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    snapshotPolicyName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotPoliciesUpdate();
}

main().catch(console.error);
