// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateDnsManagementClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the private DNS zone records specified by the referencing targetResourceIds.
 *
 * @summary returns the private DNS zone records specified by the referencing targetResourceIds.
 * x-ms-original-file: 2026-06-01-preview/GetPrivateDnsResourceReference.json
 */
async function getPrivateDNSResourceReference(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.privateDnsResourceReference.getByTargetResources({
    targetResources: [
      {
        id: "/subscriptions/subscriptionId/resourceGroups/resourceGroup1/providers/Microsoft.Network/privateTrafficManagerProfiles/ptm-profile1",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateDNSResourceReference();
}

main().catch(console.error);
