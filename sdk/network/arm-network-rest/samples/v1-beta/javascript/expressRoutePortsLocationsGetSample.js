// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location.
 *
 * @summary Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRoutePortsLocationGet.json
 */
async function expressRoutePortsLocationGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const locationName = "locationName";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/ExpressRoutePortsLocations/{locationName}",
      subscriptionId,
      locationName
    )
    .get(options);
  console.log(result);
}

expressRoutePortsLocationGet().catch(console.error);
