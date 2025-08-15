// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateMonitorRequest } from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches the Tags field of a SAP monitor for the specified subscription, resource group, and SAP monitor name.
 *
 * @summary Patches the Tags field of a SAP monitor for the specified subscription, resource group, and SAP monitor name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/monitors_PatchTags_Delete.json
 */
async function deleteTagsFieldOfASapMonitor(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const body: UpdateMonitorRequest = { identity: { type: "None" }, tags: {} };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.monitors.update(resourceGroupName, monitorName, body);
  console.log(result);
}

/**
 * This sample demonstrates how to Patches the Tags field of a SAP monitor for the specified subscription, resource group, and SAP monitor name.
 *
 * @summary Patches the Tags field of a SAP monitor for the specified subscription, resource group, and SAP monitor name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/monitors_PatchTags.json
 */
async function updateTagsFieldOfASapMonitor(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const body: UpdateMonitorRequest = {
    identity: { type: "None" },
    tags: { testkey: "testvalue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.monitors.update(resourceGroupName, monitorName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteTagsFieldOfASapMonitor();
  await updateTagsFieldOfASapMonitor();
}

main().catch(console.error);
