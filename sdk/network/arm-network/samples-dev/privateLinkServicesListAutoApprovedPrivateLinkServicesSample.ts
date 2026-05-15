// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 *
 * @summary returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 * x-ms-original-file: 2025-05-01/AutoApprovedPrivateLinkServicesGet.json
 */
async function getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkServices.listAutoApprovedPrivateLinkServices(
    "regionName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved();
}

main().catch(console.error);
