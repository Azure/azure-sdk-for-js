// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DnsPrivateView
 *
 * @summary get a DnsPrivateView
 * x-ms-original-file: 2025-09-01/DnsPrivateViews_Get_MaximumSet_Gen.json
 */
async function getADnsPrivateViewByNameGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateViews.get("eastus", "weasefewawelkrlweircicceiwpdic");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DnsPrivateView
 *
 * @summary get a DnsPrivateView
 * x-ms-original-file: 2025-09-01/DnsPrivateViews_Get_MinimumSet_Gen.json
 */
async function getADnsPrivateViewByNameGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateViews.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a DnsPrivateView
 *
 * @summary get a DnsPrivateView
 * x-ms-original-file: 2025-09-01/dnsPrivateViews_get.json
 */
async function dnsPrivateViewsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateViews.get("eastus", "ocid1....aaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await getADnsPrivateViewByNameGeneratedByMaximumSetRule();
  await getADnsPrivateViewByNameGeneratedByMinimumSetRule();
  await dnsPrivateViewsGet();
}

main().catch(console.error);
