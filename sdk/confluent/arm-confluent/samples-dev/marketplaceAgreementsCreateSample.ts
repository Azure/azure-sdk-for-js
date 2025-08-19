// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create Confluent Marketplace agreement in the subscription.
 *
 * @summary Create Confluent Marketplace agreement in the subscription.
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/MarketplaceAgreements_Create.json
 */
async function marketplaceAgreementsCreate(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.create();
  console.log(result);
}

async function main(): Promise<void> {
  await marketplaceAgreementsCreate();
}

main().catch(console.error);
