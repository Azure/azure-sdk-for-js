// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the Dynatrace environments that a user can link a azure resource to
 *
 * @summary Gets all the Dynatrace environments that a user can link a azure resource to
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_ListLinkableEnvironments_MaximumSet_Gen.json
 */

import type { LinkableEnvironmentRequest } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function monitorsListLinkableEnvironmentsMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const request: LinkableEnvironmentRequest = {
    region: "East US",
    tenantId: "00000000-0000-0000-0000-000000000000",
    userPrincipal: "alice@microsoft.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkableEnvironments(
    resourceGroupName,
    monitorName,
    request,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all the Dynatrace environments that a user can link a azure resource to
 *
 * @summary Gets all the Dynatrace environments that a user can link a azure resource to
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_ListLinkableEnvironments_MinimumSet_Gen.json
 */
async function monitorsListLinkableEnvironmentsMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const request: LinkableEnvironmentRequest = {
    region: "East US",
    tenantId: "00000000-0000-0000-0000-000000000000",
    userPrincipal: "alice@microsoft.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkableEnvironments(
    resourceGroupName,
    monitorName,
    request,
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
