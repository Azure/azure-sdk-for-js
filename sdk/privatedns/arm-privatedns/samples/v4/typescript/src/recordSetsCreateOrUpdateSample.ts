// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAAAAPut.json
 */
async function putPrivateDNSZoneAaaaRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "AAAA",
    "recordAAAA",
    {
      properties: {
        aaaaRecords: [{ ipv6Address: "::1" }],
        metadata: { key1: "value1" },
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAPut.json
 */
async function putPrivateDNSZoneARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "A",
    "recordA",
    {
      properties: {
        aRecords: [{ ipv4Address: "1.2.3.4" }],
        metadata: { key1: "value1" },
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetCNAMEPut.json
 */
async function putPrivateDNSZoneCnameRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "CNAME",
    "recordCNAME",
    {
      properties: {
        cnameRecord: { cname: "contoso.com" },
        metadata: { key1: "value1" },
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetMXPut.json
 */
async function putPrivateDNSZoneMXRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "MX",
    "recordMX",
    {
      properties: {
        metadata: { key1: "value1" },
        mxRecords: [{ exchange: "mail.privatezone1.com", preference: 0 }],
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetPTRPut.json
 */
async function putPrivateDNSZonePTRRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "0.0.127.in-addr.arpa",
    "PTR",
    "1",
    {
      properties: {
        metadata: { key1: "value1" },
        ptrRecords: [{ ptrdname: "localhost" }],
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSOAPut.json
 */
async function putPrivateDNSZoneSOARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "SOA",
    "@",
    {
      properties: {
        metadata: { key1: "value1" },
        soaRecord: {
          email: "azureprivatedns-hostmaster.microsoft.com",
          expireTime: 2419200,
          host: "azureprivatedns.net",
          minimumTtl: 300,
          refreshTime: 3600,
          retryTime: 300,
          serialNumber: 1,
        },
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSRVPut.json
 */
async function putPrivateDNSZoneSRVRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "SRV",
    "recordSRV",
    {
      properties: {
        metadata: { key1: "value1" },
        srvRecords: [{ port: 80, priority: 0, target: "contoso.com", weight: 10 }],
        ttl: 3600,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a Private DNS zone.
 *
 * @summary creates or updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetTXTPut.json
 */
async function putPrivateDNSZoneTXTRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
    "recordTXT",
    {
      properties: {
        metadata: { key1: "value1" },
        ttl: 3600,
        txtRecords: [{ value: ["string1", "string2"] }],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putPrivateDNSZoneAaaaRecordSet();
  await putPrivateDNSZoneARecordSet();
  await putPrivateDNSZoneCnameRecordSet();
  await putPrivateDNSZoneMXRecordSet();
  await putPrivateDNSZonePTRRecordSet();
  await putPrivateDNSZoneSOARecordSet();
  await putPrivateDNSZoneSRVRecordSet();
  await putPrivateDNSZoneTXTRecordSet();
}

main().catch(console.error);
