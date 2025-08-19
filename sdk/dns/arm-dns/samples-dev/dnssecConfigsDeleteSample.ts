// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone.
 *
 * @summary Deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone.
 * x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/DeleteDnssecConfig.json
 */

import { DnsManagementClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteDnssecConfig(): Promise<void> {
  const subscriptionId = process.env["DNS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DNS_RESOURCE_GROUP"] || "rg1";
  const zoneName = "zone1";
  const credential = new DefaultAzureCredential();
  const client = new DnsManagementClient(credential, subscriptionId);
  const result = await client.dnssecConfigs.beginDeleteAndWait(resourceGroupName, zoneName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDnssecConfig();
}

main().catch(console.error);
