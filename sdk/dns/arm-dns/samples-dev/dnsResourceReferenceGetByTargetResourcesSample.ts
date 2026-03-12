// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the DNS records specified by the referencing targetResourceIds.
 *
 * @summary Returns the DNS records specified by the referencing targetResourceIds.
 * x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/GetDnsResourceReference.json
 */

import type { DnsResourceReferenceRequest } from "@azure/arm-dns";
import { DnsManagementClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDnsResourceReference(): Promise<void> {
  const subscriptionId = process.env["DNS_SUBSCRIPTION_ID"] || "subid";
  const parameters: DnsResourceReferenceRequest = {
    targetResources: [
      {
        id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/trafficManagerProfiles/testpp2",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsManagementClient(credential, subscriptionId);
  const result = await client.dnsResourceReferenceOperations.getByTargetResources(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await getDnsResourceReference();
}

main().catch(console.error);
