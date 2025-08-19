// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorResource } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a MonitorResource
 *
 * @summary Create a MonitorResource
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorsCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const resource: MonitorResource = {
    dynatraceEnvironmentProperties: {
      accountInfo: {},
      environmentInfo: {},
      singleSignOnProperties: {},
    },
    identity: { type: "SystemAssigned" },
    liftrResourceCategory: "Unknown",
    location: "West US 2",
    marketplaceSubscriptionStatus: "Active",
    monitoringStatus: "Enabled",
    planData: {
      billingCycle: "Monthly",
      effectiveDate: new Date("2019-08-30T15:14:33+02:00"),
      planDetails: "dynatraceapitestplan",
      usageType: "Committed",
    },
    provisioningState: "Accepted",
    tags: { environment: "Dev" },
    userInfo: {
      country: "westus2",
      emailAddress: "alice@microsoft.com",
      firstName: "Alice",
      lastName: "Bobab",
      phoneNumber: "123456",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a MonitorResource
 *
 * @summary Create a MonitorResource
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_CreateOrUpdate_MinimumSet_Gen.json
 */
async function monitorsCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const resource: MonitorResource = { location: "West US 2" };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreateOrUpdateMaximumSetGen();
  await monitorsCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
