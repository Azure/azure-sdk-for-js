// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region.
 *
 * @summary returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region.
 * x-ms-original-file: 2025-05-01/AvailablePrivateEndpointTypesResourceGroupGet.json
 */
async function getAvailablePrivateEndpointTypesInTheResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availablePrivateEndpointTypes.listByResourceGroup(
    "rg1",
    "regionName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAvailablePrivateEndpointTypesInTheResourceGroup();
}

main().catch(console.error);
