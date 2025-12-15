// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DnsPrivateView resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateView resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/DnsPrivateViews_ListByLocation_MaximumSet_Gen.json
 */
async function listDnsPrivateViewsByLocationGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateViews.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DnsPrivateView resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateView resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/DnsPrivateViews_ListByLocation_MinimumSet_Gen.json
 */
async function listDnsPrivateViewsByLocationGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateViews.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DnsPrivateView resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateView resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/dnsPrivateViews_listByLocation.json
 */
async function dnsPrivateViewsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateViews.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDnsPrivateViewsByLocationGeneratedByMaximumSetRule();
  await listDnsPrivateViewsByLocationGeneratedByMinimumSetRule();
  await dnsPrivateViewsListByLocation();
}

main().catch(console.error);
