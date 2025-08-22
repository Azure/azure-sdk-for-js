// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the DNSSEC configuration on a DNS zone.
 *
 * @summary Creates or updates the DNSSEC configuration on a DNS zone.
 * x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/CreateOrUpdateDnssecConfig.json
 */

import { DnsManagementClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createDnssecConfig(): Promise<void> {
  const subscriptionId = process.env["DNS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DNS_RESOURCE_GROUP"] || "rg1";
  const zoneName = "zone1";
  const credential = new DefaultAzureCredential();
  const client = new DnsManagementClient(credential, subscriptionId);
  const result = await client.dnssecConfigs.beginCreateOrUpdateAndWait(resourceGroupName, zoneName);
  console.log(result);
}

async function main(): Promise<void> {
  await createDnssecConfig();
}

main().catch(console.error);
