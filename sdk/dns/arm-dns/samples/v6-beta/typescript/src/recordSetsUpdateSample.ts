// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchAAAARecordset.json
 */
async function patchAaaaRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "AAAA", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchARecordset.json
 */
async function patchARecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "A", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchCNAMERecordset.json
 */
async function patchCnameRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "CNAME", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchCaaRecordset.json
 */
async function patchCAARecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "CAA", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchDSRecordset.json
 */
async function patchDSRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "DS", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchMXRecordset.json
 */
async function patchMXRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "MX", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchNAPTRRecordset.json
 */
async function patchNaptrRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "NAPTR", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchNSRecordset.json
 */
async function patchNSRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "NS", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchPTRRecordset.json
 */
async function patchPTRRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "0.0.127.in-addr.arpa", "1", "PTR", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchSOARecordset.json
 */
async function patchSOARecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "@", "SOA", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchSRVRecordset.json
 */
async function patchSRVRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "SRV", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchTLSARecordset.json
 */
async function patchTlsaRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "TLSA", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a DNS zone.
 *
 * @summary updates a record set within a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/PatchTXTRecordset.json
 */
async function patchTXTRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.update("rg1", "zone1", "record1", "TXT", {
    properties: { metadata: { key2: "value2" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchAaaaRecordset();
  await patchARecordset();
  await patchCnameRecordset();
  await patchCAARecordset();
  await patchDSRecordset();
  await patchMXRecordset();
  await patchNaptrRecordset();
  await patchNSRecordset();
  await patchPTRRecordset();
  await patchSOARecordset();
  await patchSRVRecordset();
  await patchTlsaRecordset();
  await patchTXTRecordset();
}

main().catch(console.error);
