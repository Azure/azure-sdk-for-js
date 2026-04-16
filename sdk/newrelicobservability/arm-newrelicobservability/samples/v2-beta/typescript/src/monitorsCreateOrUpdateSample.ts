// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NewRelicMonitorResource} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic
 *
 * @summary Creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorsCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "cdlymktqw";
  const resource: NewRelicMonitorResource = {
    accountCreationSource: "LIFTR",
    identity: { type: "None", userAssignedIdentities: { key8903: {} } },
    liftrResourceCategory: "Unknown",
    location: "k",
    marketplaceSubscriptionStatus: "Active",
    monitoringStatus: "Enabled",
    newRelicAccountProperties: {
      accountInfo: {
        accountId: "xhqmg",
        ingestionKey: "wltnimmhqt",
        region: "ljcf",
      },
      organizationInfo: { organizationId: "k" },
      singleSignOnProperties: {
        enterpriseAppId: "kwiwfz",
        provisioningState: "Accepted",
        singleSignOnState: "Initial",
        singleSignOnUrl: "kvseueuljsxmfwpqctz",
      },
      userId: "vcscxlncofcuduadesd",
    },
    orgCreationSource: "LIFTR",
    planData: {
      billingCycle: "Yearly",
      effectiveDate: new Date("2022-12-05T14:11:37.786Z"),
      planDetails: "tbbiaga",
      usageType: "PAYG",
    },
    provisioningState: "Accepted",
    saaSAzureSubscriptionStatus: "Subscribed",
    saaSData: {
      saaSResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/Microsoft.SaaS/resources/abcd",
    },
    subscriptionState: "Suspended",
    tags: { key6976: "oaxfhf" },
    userInfo: {
      country: "hslqnwdanrconqyekwbnttaetv",
      emailAddress: "%6%@4-g.N1.3F-kI1.Ue-.lJso",
      firstName: "vdftzcggirefejajwahhwhyibutramdaotvnuf",
      lastName: "bcsztgqovdlmzfkjdrngidwzqsevagexzzilnlc",
      phoneNumber: "krf",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreateOrUpdateMaximumSetGen();
}

main().catch(console.error);
