// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Dynatrace environments that a user can link a azure resource to
 *
 * @summary gets all the Dynatrace environments that a user can link a azure resource to
 * x-ms-original-file: 2024-04-24/Monitors_ListLinkableEnvironments_MaximumSet_Gen.json
 */
async function monitorsListLinkableEnvironmentsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkableEnvironments(
    "myResourceGroup",
    "myMonitor",
    {
      region: "East US",
      tenantId: "00000000-0000-0000-0000-000000000000",
      userPrincipal: "alice@microsoft.com",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all the Dynatrace environments that a user can link a azure resource to
 *
 * @summary gets all the Dynatrace environments that a user can link a azure resource to
 * x-ms-original-file: 2024-04-24/Monitors_ListLinkableEnvironments_MinimumSet_Gen.json
 */
async function monitorsListLinkableEnvironmentsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkableEnvironments(
    "myResourceGroup",
    "myMonitor",
    {
      region: "East US",
      tenantId: "00000000-0000-0000-0000-000000000000",
      userPrincipal: "alice@microsoft.com",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListLinkableEnvironmentsMaximumSetGen();
  await monitorsListLinkableEnvironmentsMinimumSetGen();
}

main().catch(console.error);
