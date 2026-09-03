// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list MonitorResource resources by resource group
 *
 * @summary list MonitorResource resources by resource group
 * x-ms-original-file: 2024-04-24/Monitors_ListByResourceGroup_MaximumSet_Gen.json
 */
async function monitorsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list MonitorResource resources by resource group
 *
 * @summary list MonitorResource resources by resource group
 * x-ms-original-file: 2024-04-24/Monitors_ListByResourceGroup_MinimumSet_Gen.json
 */
async function monitorsListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListByResourceGroupMaximumSetGen();
  await monitorsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
