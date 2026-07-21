// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic
 *
 * @summary creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic
 * x-ms-original-file: 2025-05-01-preview/Monitors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorsCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.createOrUpdate("rgNewRelic", "cdlymktqw", {
    identity: { type: "None", userAssignedIdentities: { key8903: {} } },
    location: "k",
    accountCreationSource: "LIFTR",
    newRelicAccountProperties: {
      accountInfo: { accountId: "xhqmg", ingestionKey: "wltnimmhqt", region: "ljcf" },
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
    saaSAzureSubscriptionStatus: "Subscribed",
    saaSData: {
      saaSResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/Microsoft.SaaS/resources/abcd",
    },
    subscriptionState: "Suspended",
    userInfo: {
      country: "hslqnwdanrconqyekwbnttaetv",
      emailAddress: "%6%@4-g.N1.3F-kI1.Ue-.lJso",
      firstName: "vdftzcggirefejajwahhwhyibutramdaotvnuf",
      lastName: "bcsztgqovdlmzfkjdrngidwzqsevagexzzilnlc",
      phoneNumber: "krf",
    },
    tags: { key6976: "oaxfhf" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreateOrUpdateMaximumSetGen();
}

main().catch(console.error);
