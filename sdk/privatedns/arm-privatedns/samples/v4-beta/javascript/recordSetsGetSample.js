// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetAAAAGet.json
 */
async function getPrivateDNSZoneAaaaRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "AAAA",
    "recordAAAA",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetAGet.json
 */
async function getPrivateDNSZoneARecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "privatezone1.com", "A", "recordA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetCNAMEGet.json
 */
async function getPrivateDNSZoneCnameRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "CNAME",
    "recordCNAME",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetMXGet.json
 */
async function getPrivateDNSZoneMXRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "MX",
    "recordMX",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetPTRGet.json
 */
async function getPrivateDNSZonePTRRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "0.0.127.in-addr.arpa", "PTR", "1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetSOAGet.json
 */
async function getPrivateDNSZoneSOARecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "privatezone1.com", "SOA", "@");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetSRVGet.json
 */
async function getPrivateDNSZoneSRVRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "SRV",
    "recordSRV",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2024-06-01/RecordSetTXTGet.json
 */
async function getPrivateDNSZoneTXTRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
    "recordTXT",
  );
  console.log(result);
}

async function main() {
  await getPrivateDNSZoneAaaaRecordSet();
  await getPrivateDNSZoneARecordSet();
  await getPrivateDNSZoneCnameRecordSet();
  await getPrivateDNSZoneMXRecordSet();
  await getPrivateDNSZonePTRRecordSet();
  await getPrivateDNSZoneSOARecordSet();
  await getPrivateDNSZoneSRVRecordSet();
  await getPrivateDNSZoneTXTRecordSet();
}

main().catch(console.error);
