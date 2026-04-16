// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 *
 * @summary Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AutoApprovedPrivateLinkServicesResourceGroupGet.json
 */
async function getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "regionName";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkServices.listAutoApprovedPrivateLinkServicesByResourceGroup(
    location,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getListOfPrivateLinkServiceIdThatCanBeLinkedToAPrivateEndPointWithAutoApproved();
}

main().catch(console.error);
