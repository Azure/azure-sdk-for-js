// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SapLandscapeMonitor } from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches the SAP Landscape Monitor Dashboard for the specified subscription, resource group, and SAP monitor name.
 *
 * @summary Patches the SAP Landscape Monitor Dashboard for the specified subscription, resource group, and SAP monitor name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/SapLandscapeMonitor_Update.json
 */
async function updateSapMonitor(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const sapLandscapeMonitorParameter: SapLandscapeMonitor = {
    grouping: {
      landscape: [{ name: "Prod", topSid: ["SID1", "SID2"] }],
      sapApplication: [{ name: "ERP1", topSid: ["SID1", "SID2"] }],
    },
    topMetricsThresholds: [{ name: "Instance Availability", green: 90, red: 50, yellow: 75 }],
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapLandscapeMonitorOperations.update(
    resourceGroupName,
    monitorName,
    sapLandscapeMonitorParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSapMonitor();
}

main().catch(console.error);
