// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateDnsManagementClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAAAAPatch.json
 */
async function patchPrivateDNSZoneAaaaRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "AAAA",
    "recordAAAA",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetAPatch.json
 */
async function patchPrivateDNSZoneARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "A",
    "recordA",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetCNAMEPatch.json
 */
async function patchPrivateDNSZoneCnameRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "CNAME",
    "recordCNAME",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetMXPatch.json
 */
async function patchPrivateDNSZoneMXRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "MX",
    "recordMX",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetPTRPatch.json
 */
async function patchPrivateDNSZonePTRRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "0.0.127.in-addr.arpa",
    "PTR",
    "1",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSOAPatch.json
 */
async function patchPrivateDNSZoneSOARecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update("resourceGroup1", "privatezone1.com", "SOA", "@", {
    metadata: { key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetSRVPatch.json
 */
async function patchPrivateDNSZoneSRVRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "SRV",
    "recordSRV",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a record set within a Private DNS zone.
 *
 * @summary updates a record set within a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetTXTPatch.json
 */
async function patchPrivateDNSZoneTXTRecordSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.recordSets.update(
    "resourceGroup1",
    "privatezone1.com",
    "TXT",
    "recordTXT",
    { metadata: { key2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
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
