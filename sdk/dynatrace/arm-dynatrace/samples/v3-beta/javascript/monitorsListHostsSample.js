// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the VM/VMSS resources currently being monitored by the Dynatrace resource.
 *
 * @summary list the VM/VMSS resources currently being monitored by the Dynatrace resource.
 * x-ms-original-file: 2024-04-24/Monitors_ListHosts_MaximumSet_Gen.json
 */
async function monitorsListHostsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list the VM/VMSS resources currently being monitored by the Dynatrace resource.
 *
 * @summary list the VM/VMSS resources currently being monitored by the Dynatrace resource.
 * x-ms-original-file: 2024-04-24/Monitors_ListHosts_MinimumSet_Gen.json
 */
async function monitorsListHostsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListHostsMaximumSetGen();
  await monitorsListHostsMinimumSetGen();
}

main().catch(console.error);
