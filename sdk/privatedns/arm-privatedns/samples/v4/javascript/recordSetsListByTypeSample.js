// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAAAAList.json
 */
async function getPrivateDNSZoneAaaaRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "AAAA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAList.json
 */
async function getPrivateDNSZoneARecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "A",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetCNAMEList.json
 */
async function getPrivateDNSZoneCnameRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "CNAME",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetMXList.json
 */
async function getPrivateDNSZoneMXRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "MX",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetPTRList.json
 */
async function getPrivateDNSZonePTRRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "0.0.127.in-addr.arpa",
    "PTR",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSOAList.json
 */
async function getPrivateDNSZoneSOARecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "SOA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSRVList.json
 */
async function getPrivateDNSZoneSRVRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "SRV",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a Private DNS zone.
 *
 * @summary lists the record sets of a specified type in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetTXTList.json
 */
async function getPrivateDNSZoneTXTRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateDNSZoneAaaaRecordSets();
  await getPrivateDNSZoneARecordSets();
  await getPrivateDNSZoneCnameRecordSets();
  await getPrivateDNSZoneMXRecordSets();
  await getPrivateDNSZonePTRRecordSets();
  await getPrivateDNSZoneSOARecordSets();
  await getPrivateDNSZoneSRVRecordSets();
  await getPrivateDNSZoneTXTRecordSets();
}

main().catch(console.error);
