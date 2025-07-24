// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Confluent Marketplace agreement in the subscription.
 *
 * @summary create Confluent Marketplace agreement in the subscription.
 * x-ms-original-file: 2024-07-01/MarketplaceAgreements_Create.json
 */
async function marketplaceAgreementsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.create();
  console.log(result);
}

async function main() {
  await marketplaceAgreementsCreate();
}

main().catch(console.error);
