// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the VM/VMSS resources currently being monitored by the Dynatrace resource.
 *
 * @summary List the VM/VMSS resources currently being monitored by the Dynatrace resource.
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_ListHosts_MaximumSet_Gen.json
 */

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function monitorsListHostsMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(resourceGroupName, monitorName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List the VM/VMSS resources currently being monitored by the Dynatrace resource.
 *
 * @summary List the VM/VMSS resources currently being monitored by the Dynatrace resource.
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_ListHosts_MinimumSet_Gen.json
 */
async function monitorsListHostsMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(resourceGroupName, monitorName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListHostsMaximumSetGen();
  await monitorsListHostsMinimumSetGen();
}

main().catch(console.error);
