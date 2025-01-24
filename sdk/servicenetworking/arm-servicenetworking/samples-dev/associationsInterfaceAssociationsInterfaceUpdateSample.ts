// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Association
 *
 * @summary update a Association
 * x-ms-original-file: 2025-01-01/AssociationPatch.json
 */
async function updateAssociation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.associationsInterface.AssociationsInterface_update(
    "rg1",
    "tc1",
    "as1",
    {
      properties: {
        associationType: "subnets",
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet-tc/subnets/tc-subnet",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  updateAssociation();
}

main().catch(console.error);
