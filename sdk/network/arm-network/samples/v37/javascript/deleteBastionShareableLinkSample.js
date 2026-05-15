// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Bastion Shareable Links for all the VMs specified in the request.
 *
 * @summary deletes the Bastion Shareable Links for all the VMs specified in the request.
 * x-ms-original-file: 2025-05-01/BastionShareableLinkDelete.json
 */
async function deleteBastionShareableLinksForTheRequestVMs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.deleteBastionShareableLink("rg1", "bastionhosttenant", {
    vms: [
      {
        vm: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgx/providers/Microsoft.Compute/virtualMachines/vm1",
        },
      },
      {
        vm: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgx/providers/Microsoft.Compute/virtualMachines/vm2",
        },
      },
    ],
  });
}

async function main() {
  await deleteBastionShareableLinksForTheRequestVMs();
}

main().catch(console.error);
