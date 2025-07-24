// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Confluent marketplace agreements in the subscription.
 *
 * @summary list Confluent marketplace agreements in the subscription.
 * x-ms-original-file: 2024-07-01/MarketplaceAgreements_List.json
 */
async function marketplaceAgreementsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceAgreements.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await marketplaceAgreementsList();
}

main().catch(console.error);
