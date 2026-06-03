// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Datadog marketplace agreements in the subscription.
 *
 * @summary list Datadog marketplace agreements in the subscription.
 * x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_List.json
 */
async function marketplaceAgreementsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
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
