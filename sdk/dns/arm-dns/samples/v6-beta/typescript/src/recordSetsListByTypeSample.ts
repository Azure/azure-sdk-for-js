// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListAAAARecordset.json
 */
async function listAaaaRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "AAAA")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListARecordset.json
 */
async function listARecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "A")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListCNAMERecordset.json
 */
async function listCnameRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "CNAME")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListCaaRecordset.json
 */
async function listCAARecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "CAA")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListDSRecordset.json
 */
async function listDSRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "DS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListMXRecordset.json
 */
async function listMXRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "MX")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListNAPTRRecordset.json
 */
async function listNaptrRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "NAPTR")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListNSRecordset.json
 */
async function listNSRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "NS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListPTRRecordset.json
 */
async function listPTRRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "0.0.127.in-addr.arpa", "PTR")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListSOARecordset.json
 */
async function listSOARecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "SOA")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListSRVRecordset.json
 */
async function listSRVRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "SRV")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListTLSARecordset.json
 */
async function listTlsaRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "TLSA")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the record sets of a specified type in a DNS zone.
 *
 * @summary lists the record sets of a specified type in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListTXTRecordset.json
 */
async function listTXTRecordsets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listByType("rg1", "zone1", "TXT")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAaaaRecordsets();
  await listARecordsets();
  await listCnameRecordsets();
  await listCAARecordsets();
  await listDSRecordsets();
  await listMXRecordsets();
  await listNaptrRecordsets();
  await listNSRecordsets();
  await listPTRRecordsets();
  await listSOARecordsets();
  await listSRVRecordsets();
  await listTlsaRecordsets();
  await listTXTRecordsets();
}

main().catch(console.error);
