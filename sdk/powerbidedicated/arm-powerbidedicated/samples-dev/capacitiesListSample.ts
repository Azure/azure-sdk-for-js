// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Dedicated capacities for the given subscription.
 *
 * @summary Lists all the Dedicated capacities for the given subscription.
 * x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInSubscription.json
 */

import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDetailsOfACapacity(): Promise<void> {
  const subscriptionId =
    process.env["POWERBIDEDICATED_SUBSCRIPTION_ID"] || "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const credential = new DefaultAzureCredential();
  const client = new PowerBIDedicated(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacities.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getDetailsOfACapacity();
}

main().catch(console.error);
