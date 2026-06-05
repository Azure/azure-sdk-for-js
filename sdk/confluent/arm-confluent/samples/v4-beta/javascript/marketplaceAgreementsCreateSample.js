// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Confluent Marketplace agreement in the subscription.
 *
 * @summary create Confluent Marketplace agreement in the subscription.
 * x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_Create_MaximumSet_Gen.json
 */
async function createConfluentMarketplaceAgreementInTheSubscriptionMaximumset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.create({
    body: {
      publisher: "cxcrrfggvdmvcchohkyatlvbpyy",
      product: "ogusipjbwihlwbfivdbjfuvoqwija",
      plan: "vgphlikczel",
      licenseTextLink: "ztckliskduxmcluia",
      privacyPolicyLink: "wwvlrlfhzmvfjgimkhkqcaxn",
      retrieveDatetime: new Date("2025-08-18T11:10:31.028Z"),
      signature: "cfdxpybzzsrgcdtebmqzzskxfiool",
      accepted: true,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create Confluent Marketplace agreement in the subscription.
 *
 * @summary create Confluent Marketplace agreement in the subscription.
 * x-ms-original-file: 2025-08-18-preview/MarketplaceAgreements_Create_MinimumSet_Gen.json
 */
async function createConfluentMarketplaceAgreementInTheSubscriptionMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.create();
  console.log(result);
}

async function main() {
  await createConfluentMarketplaceAgreementInTheSubscriptionMaximumset();
  await createConfluentMarketplaceAgreementInTheSubscriptionMinimumSet();
}

main().catch(console.error);
