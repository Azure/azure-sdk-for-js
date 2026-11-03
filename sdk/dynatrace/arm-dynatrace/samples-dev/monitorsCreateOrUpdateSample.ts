// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a MonitorResource
 *
 * @summary create a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorsCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.createOrUpdate("myResourceGroup", "myMonitor", {
    identity: { type: "SystemAssigned" },
    location: "West US 2",
    dynatraceEnvironmentProperties: {
      accountInfo: {},
      environmentInfo: {},
      singleSignOnProperties: {},
    },
    marketplaceSubscriptionStatus: "Active",
    monitoringStatus: "Enabled",
    planData: {
      billingCycle: "Monthly",
      effectiveDate: new Date("2019-08-30T15:14:33+02:00"),
      planDetails: "dynatraceapitestplan",
      usageType: "Committed",
    },
    userInfo: {
      country: "westus2",
      emailAddress: "alice@microsoft.com",
      firstName: "Alice",
      lastName: "Bobab",
      phoneNumber: "123456",
    },
    tags: { Environment: "Dev" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a MonitorResource
 *
 * @summary create a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_CreateOrUpdate_MinimumSet_Gen.json
 */
async function monitorsCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.createOrUpdate("myResourceGroup", "myMonitor", {
    location: "West US 2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreateOrUpdateMaximumSetGen();
  await monitorsCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
