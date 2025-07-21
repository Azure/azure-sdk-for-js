// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetAAAARecordset.json
 */
async function getAaaaRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "AAAA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetARecordset.json
 */
async function getARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "A");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetCNAMERecordset.json
 */
async function getCnameRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "CNAME");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetCaaRecordset.json
 */
async function getCAARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "CAA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetDSRecordset.json
 */
async function getDSRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "DS");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetMXRecordset.json
 */
async function getMXRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "MX");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetNAPTRRecordset.json
 */
async function getNaptrRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "NAPTR");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetNSRecordset.json
 */
async function getNSRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "NS");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetPTRRecordset.json
 */
async function getPTRRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "0.0.127.in-addr.arpa", "1", "PTR");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetSOARecordset.json
 */
async function getSOARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "@", "SOA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetSRVRecordset.json
 */
async function getSRVRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "SRV");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetTLSARecordset.json
 */
async function getTlsaRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "TLSA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2023-07-01-preview/GetTXTRecordset.json
 */
async function getTXTRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.get("rg1", "zone1", "record1", "TXT");
  console.log(result);
}

async function main() {
  await getAaaaRecordset();
  await getARecordset();
  await getCnameRecordset();
  await getCAARecordset();
  await getDSRecordset();
  await getMXRecordset();
  await getNaptrRecordset();
  await getNSRecordset();
  await getPTRRecordset();
  await getSOARecordset();
  await getSRVRecordset();
  await getTlsaRecordset();
  await getTXTRecordset();
}

main().catch(console.error);
