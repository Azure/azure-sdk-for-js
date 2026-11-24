// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateDnsManagementClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2026-06-01-preview/PTMLinkRecordSetAGet.json
 */
async function getPrivateDNSZonePTMLinkARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "A",
    "ptmlinkrecord",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2026-06-01-preview/RecordSetAAAAGet.json
 */
async function getPrivateDNSZoneAaaaRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-06-01-preview/RecordSetAGet.json
 */
async function getPrivateDNSZoneARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "privatezone1.com", "A", "recordA");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2026-06-01-preview/RecordSetCNAMEGet.json
 */
async function getPrivateDNSZoneCnameRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-06-01-preview/RecordSetMXGet.json
 */
async function getPrivateDNSZoneMXRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-06-01-preview/RecordSetPTRGet.json
 */
async function getPrivateDNSZonePTRRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "0.0.127.in-addr.arpa", "PTR", "1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2026-06-01-preview/RecordSetSOAGet.json
 */
async function getPrivateDNSZoneSOARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.get("resourceGroup1", "privatezone1.com", "SOA", "@");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a record set.
 *
 * @summary gets a record set.
 * x-ms-original-file: 2026-06-01-preview/RecordSetSRVGet.json
 */
async function getPrivateDNSZoneSRVRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2026-06-01-preview/RecordSetTXTGet.json
 */
async function getPrivateDNSZoneTXTRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.get(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
    "recordTXT",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateDNSZonePTMLinkARecordSet();
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
