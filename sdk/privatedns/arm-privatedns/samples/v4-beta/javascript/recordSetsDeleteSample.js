// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateDnsManagementClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetAAAADelete.json
 */
async function deletePrivateDNSZoneAaaaRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "AAAA", "recordAAAA");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetADelete.json
 */
async function deletePrivateDNSZoneARecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "A", "recordA");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetCNAMEDelete.json
 */
async function deletePrivateDNSZoneCnameRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "CNAME", "recordCNAME");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetMXDelete.json
 */
async function deletePrivateDNSZoneMXRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "MX", "recordMX");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetPTRDelete.json
 */
async function deletePrivateDNSZonePTRRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "0.0.127.in-addr.arpa", "PTR", "1");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetSRVDelete.json
 */
async function deletePrivateDNSZoneSRVRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "SRV", "recordSRV");
}

/**
 * This sample demonstrates how to deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @summary deletes a record set from a Private DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2026-06-01-preview/RecordSetTXTDelete.json
 */
async function deletePrivateDNSZoneTXTRecordSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  await client.recordSets.delete("resourceGroup1", "privatezone1.com", "TXT", "recordTXT");
}

async function main() {
  await deletePrivateDNSZoneAaaaRecordSet();
  await deletePrivateDNSZoneARecordSet();
  await deletePrivateDNSZoneCnameRecordSet();
  await deletePrivateDNSZoneMXRecordSet();
  await deletePrivateDNSZonePTRRecordSet();
  await deletePrivateDNSZoneSRVRecordSet();
  await deletePrivateDNSZoneTXTRecordSet();
}

main().catch(console.error);
