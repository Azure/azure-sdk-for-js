// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 *
 * @summary returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 * x-ms-original-file: 2025-05-01/AutoApprovedPrivateLinkServicesResourceGroupGet.json
 */
async function getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkServices.listAutoApprovedPrivateLinkServicesByResourceGroup(
    "rg1",
    "regionName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved();
}

main().catch(console.error);
