// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DnsPrivateZone resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateZone resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/DnsPrivateZones_ListByLocation_MaximumSet_Gen.json
 */
async function listDnsPrivateZonesByLocationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateZones.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DnsPrivateZone resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateZone resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/DnsPrivateZones_ListByLocation_MinimumSet_Gen.json
 */
async function listDnsPrivateZonesByLocationGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateZones.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DnsPrivateZone resources by SubscriptionLocationResource
 *
 * @summary list DnsPrivateZone resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/dnsPrivateZones_listByLocation.json
 */
async function dnsPrivateZonesListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsPrivateZones.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDnsPrivateZonesByLocationGeneratedByMaximumSetRule();
  await listDnsPrivateZonesByLocationGeneratedByMinimumSetRule();
  await dnsPrivateZonesListByLocation();
}

main().catch(console.error);
