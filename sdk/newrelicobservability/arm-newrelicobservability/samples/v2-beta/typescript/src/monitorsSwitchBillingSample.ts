// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SwitchBillingRequest} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace
 *
 * @summary Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_SwitchBilling_MaximumSet_Gen.json
 */
async function monitorsSwitchBillingMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request: SwitchBillingRequest = {
    azureResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
    organizationId: "k",
    planData: {
      billingCycle: "Yearly",
      effectiveDate: new Date("2022-12-05T14:11:37.786Z"),
      planDetails: "tbbiaga",
      usageType: "PAYG",
    },
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.switchBilling(
    resourceGroupName,
    monitorName,
    request,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace
 *
 * @summary Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_SwitchBilling_MinimumSet_Gen.json
 */
async function monitorsSwitchBillingMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request: SwitchBillingRequest = {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.switchBilling(
    resourceGroupName,
    monitorName,
    request,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsSwitchBillingMaximumSetGen();
  await monitorsSwitchBillingMinimumSetGen();
}

main().catch(console.error);
