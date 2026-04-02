// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a NSP resource association.
 *
 * @summary creates or updates a NSP resource association.
 * x-ms-original-file: 2025-05-01/NspAssociationPut.json
 */
async function nspAssociationPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAssociations.createOrUpdate(
    "rg1",
    "nsp1",
    "association1",
    {
      accessMode: "Enforced",
      privateLinkResource: {
        id: "/subscriptions/{paasSubscriptionId}/resourceGroups/{paasResourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}",
      },
      profile: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityPerimeters/nsp1/profiles/{profileName}",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationPut();
}

main().catch(console.error);
