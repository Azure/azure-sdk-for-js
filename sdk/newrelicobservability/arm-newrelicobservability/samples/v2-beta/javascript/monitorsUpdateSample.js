// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing New Relic monitor resource from your Azure subscription
 *
 * @summary updates an existing New Relic monitor resource from your Azure subscription
 * x-ms-original-file: 2025-05-01-preview/Monitors_Update_MaximumSet_Gen.json
 */
async function monitorsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.update("rgNewRelic", "cdlymktqw", {
    identity: { type: "None", userAssignedIdentities: { key8903: {} } },
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
    userInfo: {
      country: "hslqnwdanrconqyekwbnttaetv",
      emailAddress: "%6%@4-g.N1.3F-kI1.Ue-.lJso",
      firstName: "vdftzcggirefejajwahhwhyibutramdaotvnuf",
      lastName: "bcsztgqovdlmzfkjdrngidwzqsevagexzzilnlc",
      phoneNumber: "krf",
    },
    tags: { key164: "jqakdrrmmyzytqu" },
  });
  console.log(result);
}

async function main() {
  await monitorsUpdateMaximumSetGen();
}

main().catch(console.error);
