// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all record sets in a DNS zone.
 *
 * @summary Lists all record sets in a DNS zone.
 * x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/ListRecordSetsByZone.json
 */

import { DnsManagementClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllRecordsetsByZone(): Promise<void> {
  const subscriptionId = process.env["DNS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DNS_RESOURCE_GROUP"] || "rg1";
  const zoneName = "zone1";
  const credential = new DefaultAzureCredential();
  const client = new DnsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listAllByDnsZone(resourceGroupName, zoneName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllRecordsetsByZone();
}

main().catch(console.error);
