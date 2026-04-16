// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NewRelicMonitorResourceUpdate} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing New Relic monitor resource from your Azure subscription
 *
 * @summary Updates an existing New Relic monitor resource from your Azure subscription
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_Update_MaximumSet_Gen.json
 */
async function monitorsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "cdlymktqw";
  const properties: NewRelicMonitorResourceUpdate = {
    accountCreationSource: "LIFTR",
    identity: { type: "None", userAssignedIdentities: { key8903: {} } },
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
    tags: { key164: "jqakdrrmmyzytqu" },
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
  const result = await client.monitors.beginUpdateAndWait(
    resourceGroupName,
    monitorName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdateMaximumSetGen();
}

main().catch(console.error);
