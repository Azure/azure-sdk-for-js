// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Bastion Shareable Links for all the VMs specified in the request.
 *
 * @summary creates a Bastion Shareable Links for all the VMs specified in the request.
 * x-ms-original-file: 2025-05-01/BastionShareableLinkCreate.json
 */
async function createBastionShareableLinksForTheRequestVMs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.putBastionShareableLink("rg1", "bastionhosttenant", {
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
  console.log(result);
}

async function main(): Promise<void> {
  await createBastionShareableLinksForTheRequestVMs();
}

main().catch(console.error);
