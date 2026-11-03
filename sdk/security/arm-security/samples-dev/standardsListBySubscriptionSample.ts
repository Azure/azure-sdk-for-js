// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all relevant security standards over a subscription level scope.
 *
 * @summary get a list of all relevant security standards over a subscription level scope.
 * x-ms-original-file: 2021-08-01-preview/Standards/ListBySubscriptionStandards_example.json
 */
async function listSecurityStandardsBySubscriptionLevelScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.standards.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityStandardsBySubscriptionLevelScope();
}

main().catch(console.error);
