// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of accounts apps.
 *
 * @summary Returns list of accounts apps.
 * x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_List.json
 */

import { GraphServices } from "@azure/arm-graphservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAccountResource(): Promise<void> {
  const subscriptionId =
    process.env["GRAPHSERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["GRAPHSERVICES_RESOURCE_GROUP"] || "testResourceGroupGRAM";
  const credential = new DefaultAzureCredential();
  const client = new GraphServices(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await createOrUpdateAccountResource();
}

main().catch(console.error);
