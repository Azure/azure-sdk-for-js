// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorResourceUpdate } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a MonitorResource
 *
 * @summary Update a MonitorResource
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_Update_MaximumSet_Gen.json
 */
async function monitorsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const resource: MonitorResourceUpdate = { tags: { environment: "Dev" } };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.update(resourceGroupName, monitorName, resource);
  console.log(result);
}

/**
 * This sample demonstrates how to Update a MonitorResource
 *
 * @summary Update a MonitorResource
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_Update_MinimumSet_Gen.json
 */
async function monitorsUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const resource: MonitorResourceUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.update(resourceGroupName, monitorName, resource);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdateMaximumSetGen();
  await monitorsUpdateMinimumSetGen();
}

main().catch(console.error);
