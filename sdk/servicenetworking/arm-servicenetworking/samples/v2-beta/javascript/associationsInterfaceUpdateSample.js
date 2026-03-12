// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Association
 *
 * @summary update a Association
 * x-ms-original-file: 2025-03-01-preview/AssociationPatch.json
 */
async function updateAssociation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.associationsInterface.update("rg1", "tc1", "as1", {
    properties: {
      associationType: "subnets",
      subnet: {
        id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet-tc/subnets/tc-subnet",
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateAssociation();
}

main().catch(console.error);
