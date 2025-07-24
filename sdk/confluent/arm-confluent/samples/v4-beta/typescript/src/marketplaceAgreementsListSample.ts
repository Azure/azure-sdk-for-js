// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Confluent marketplace agreements in the subscription.
 *
 * @summary list Confluent marketplace agreements in the subscription.
 * x-ms-original-file: 2024-07-01/MarketplaceAgreements_List.json
 */
async function marketplaceAgreementsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceAgreements.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await marketplaceAgreementsList();
}

main().catch(console.error);
