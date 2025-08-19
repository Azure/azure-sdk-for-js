// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the tenants for your account.
 *
 * @summary Gets the tenants for your account.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2022-12-01/examples/GetTenants.json
 */

import { SubscriptionClient } from "@azure/arm-resources-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllTenants(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.tenants.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllTenants();
}

main().catch(console.error);
