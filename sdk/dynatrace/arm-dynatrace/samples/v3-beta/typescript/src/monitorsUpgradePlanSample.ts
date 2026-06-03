// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades the billing Plan for Dynatrace monitor resource.
 *
 * @summary upgrades the billing Plan for Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/Monitors_UpgradePlan_MaximumSet_Gen.json
 */
async function monitorsUpgradePlanMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.monitors.upgradePlan("myResourceGroup", "myMonitor", {
    planData: {
      billingCycle: "Monthly",
      effectiveDate: new Date("2019-08-30T15:14:33+02:00"),
      planDetails: "dynatraceapitestplan",
      usageType: "Committed",
    },
  });
}

/**
 * This sample demonstrates how to upgrades the billing Plan for Dynatrace monitor resource.
 *
 * @summary upgrades the billing Plan for Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/Monitors_UpgradePlan_MinimumSet_Gen.json
 */
async function monitorsUpgradePlanMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.monitors.upgradePlan("myResourceGroup", "myMonitor", {
    planData: {
      billingCycle: "Monthly",
      effectiveDate: new Date("2019-08-30T15:14:33+02:00"),
      planDetails: "dynatraceapitestplan",
      usageType: "Committed",
    },
  });
}

async function main(): Promise<void> {
  await monitorsUpgradePlanMaximumSetGen();
  await monitorsUpgradePlanMinimumSetGen();
}

main().catch(console.error);
