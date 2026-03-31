// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return the Bastion Shareable Links for all the VMs specified in the request.
 *
 * @summary return the Bastion Shareable Links for all the VMs specified in the request.
 * x-ms-original-file: 2025-05-01/BastionShareableLinkGet.json
 */
async function returnsTheBastionShareableLinksForTheRequestVMs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.getBastionShareableLink("rg1", "bastionhosttenant", {
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
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await returnsTheBastionShareableLinksForTheRequestVMs();
}

main().catch(console.error);
