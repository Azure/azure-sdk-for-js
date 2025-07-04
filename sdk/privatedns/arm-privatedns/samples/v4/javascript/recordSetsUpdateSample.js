// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAAAAPatch.json
 */
async function patchPrivateDNSZoneAaaaRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "AAAA",
    "recordAAAA",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAPatch.json
 */
async function patchPrivateDNSZoneARecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "A",
    "recordA",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetCNAMEPatch.json
 */
async function patchPrivateDNSZoneCnameRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "CNAME",
    "recordCNAME",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetMXPatch.json
 */
async function patchPrivateDNSZoneMXRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "MX",
    "recordMX",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetPTRPatch.json
 */
async function patchPrivateDNSZonePTRRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "0.0.127.in-addr.arpa",
    "PTR",
    "1",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSOAPatch.json
 */
async function patchPrivateDNSZoneSOARecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("resourceGroup1", "privatezone1.com", "SOA", "@", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSRVPatch.json
 */
async function patchPrivateDNSZoneSRVRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "SRV",
    "recordSRV",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetTXTPatch.json
 */
async function patchPrivateDNSZoneTXTRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
    "recordTXT",
    { properties: { metadata: { key2: "value2" } } },
  );
  console.log(result);
}

async function main() {
  await patchPrivateDNSZoneAaaaRecordSet();
  await patchPrivateDNSZoneARecordSet();
  await patchPrivateDNSZoneCnameRecordSet();
  await patchPrivateDNSZoneMXRecordSet();
  await patchPrivateDNSZonePTRRecordSet();
  await patchPrivateDNSZoneSOARecordSet();
  await patchPrivateDNSZoneSRVRecordSet();
  await patchPrivateDNSZoneTXTRecordSet();
}

main().catch(console.error);
