// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DnsPrivateZone
 *
 * @summary get a DnsPrivateZone
 * x-ms-original-file: 2025-09-01/DnsPrivateZones_Get_MaximumSet_Gen.json
 */
async function getADnsPrivateZoneByNameGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateZones.get("eastus", "dnsprivatezone1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DnsPrivateZone
 *
 * @summary get a DnsPrivateZone
 * x-ms-original-file: 2025-09-01/DnsPrivateZones_Get_MinimumSet_Gen.json
 */
async function getADnsPrivateZoneByNameGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateZones.get("eastus", "dnsprivatezone1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DnsPrivateZone
 *
 * @summary get a DnsPrivateZone
 * x-ms-original-file: 2025-09-01/dnsPrivateZones_get.json
 */
async function dnsPrivateZonesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dnsPrivateZones.get("eastus", "example-dns-private-zone");
  console.log(result);
}

async function main() {
  await getADnsPrivateZoneByNameGeneratedByMaximumSetRule();
  await getADnsPrivateZoneByNameGeneratedByMinimumSetRule();
  await dnsPrivateZonesGet();
}

main().catch(console.error);
