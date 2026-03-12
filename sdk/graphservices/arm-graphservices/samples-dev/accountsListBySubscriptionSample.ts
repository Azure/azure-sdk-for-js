// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of accounts belonging to a subscription.
 *
 * @summary Returns list of accounts belonging to a subscription.
 * x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List_Sub.json
 */

import { GraphServices } from "@azure/arm-graphservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getListOfAccountsBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["GRAPHSERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new GraphServices(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getListOfAccountsBySubscription();
}

main().catch(console.error);
