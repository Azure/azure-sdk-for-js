// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the IP Address Space to be allocated for this Community is available.
 *
 * @summary checks that the IP Address Space to be allocated for this Community is available.
 * x-ms-original-file: 2025-05-01-preview/Community_PostCheckAddressSpaceAvailability.json
 */
async function communityCheckAddressSpaceAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.community.checkAddressSpaceAvailability(
    "rgopenapi",
    "TestMyCommunity",
    {
      communityResourceId:
        "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/communities/TestMyCommunity",
      enclaveVirtualNetwork: {
        networkSize: "small",
        customCidrRange: "10.0.0.0/24",
        subnetConfigurations: [{ subnetName: "test", networkPrefixSize: 26 }],
        allowSubnetCommunication: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await communityCheckAddressSpaceAvailability();
}

main().catch(console.error);
