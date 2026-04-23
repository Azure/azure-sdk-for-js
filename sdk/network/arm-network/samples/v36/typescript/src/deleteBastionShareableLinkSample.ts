// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BastionShareableLinkListRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the Bastion Shareable Links for all the VMs specified in the request.
 *
 * @summary Deletes the Bastion Shareable Links for all the VMs specified in the request.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/BastionShareableLinkDelete.json
 */
async function deleteBastionShareableLinksForTheRequestVMS(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const bastionHostName = "bastionhosttenant";
  const bslRequest: BastionShareableLinkListRequest = {
    vms: [
      {
        vm: {
          id: "/subscriptions/subid/resourceGroups/rgx/providers/Microsoft.Compute/virtualMachines/vm1",
        },
      },
      {
        vm: {
          id: "/subscriptions/subid/resourceGroups/rgx/providers/Microsoft.Compute/virtualMachines/vm2",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.beginDeleteBastionShareableLinkAndWait(
    resourceGroupName,
    bastionHostName,
    bslRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteBastionShareableLinksForTheRequestVMS();
}

main().catch(console.error);
