// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteAAAARecordset.json
 */
async function deleteAaaaRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "AAAA");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteARecordset.json
 */
async function deleteARecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "A");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteCNAMERecordset.json
 */
async function deleteCnameRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "CNAME");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteCaaRecordset.json
 */
async function deleteCAARecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "CAA");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteDSRecordset.json
 */
async function deleteDSRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "DS");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteMXRecordset.json
 */
async function deleteMXRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "MX");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteNAPTRRecordset.json
 */
async function deleteNaptrRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "NAPTR");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteNSRecordset.json
 */
async function deleteNSRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "NS");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeletePTRRecordset.json
 */
async function deletePTRRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "0.0.127.in-addr.arpa", "1", "PTR");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteSRVRecordset.json
 */
async function deleteSRVRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "SRV");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteTLSARecordset.json
 */
async function deleteTlsaRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "TLSA");
}

/**
 * This sample demonstrates how to deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 *
 * @summary deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * x-ms-original-file: 2023-07-01-preview/DeleteTXTRecordset.json
 */
async function deleteTXTRecordset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.recordSets.delete("rg1", "zone1", "record1", "TXT");
}

async function main(): Promise<void> {
  await deleteAaaaRecordset();
  await deleteARecordset();
  await deleteCnameRecordset();
  await deleteCAARecordset();
  await deleteDSRecordset();
  await deleteMXRecordset();
  await deleteNaptrRecordset();
  await deleteNSRecordset();
  await deletePTRRecordset();
  await deleteSRVRecordset();
  await deleteTlsaRecordset();
  await deleteTXTRecordset();
}

main().catch(console.error);
