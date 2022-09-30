// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Prepares a subnet by applying network intent policies.
 *
 * @summary Prepares a subnet by applying network intent policies.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SubnetPrepareNetworkPolicies.json
 */
async function prepareNetworkPolicies() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const subnetName = "subnet1";
  const options = {
    body: { serviceName: "Microsoft.Sql/managedInstances" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/PrepareNetworkPolicies",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

prepareNetworkPolicies().catch(console.error);
