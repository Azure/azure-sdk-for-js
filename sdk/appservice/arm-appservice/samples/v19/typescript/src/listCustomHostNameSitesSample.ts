// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get custom hostnames under this subscription
 *
 * @summary get custom hostnames under this subscription
 * x-ms-original-file: 2025-05-01/ListCustomHostNameSites.json
 */
async function getCustomHostnamesUnderSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.listCustomHostNameSites()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get custom hostnames under this subscription
 *
 * @summary get custom hostnames under this subscription
 * x-ms-original-file: 2025-05-01/ListCustomSpecificHostNameSites.json
 */
async function getSpecificCustomHostnameUnderSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.listCustomHostNameSites({ hostname: "www.example.com" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getCustomHostnamesUnderSubscription();
  await getSpecificCustomHostnameUnderSubscription();
}

main().catch(console.error);
