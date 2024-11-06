// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRoutePortsLocationsGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

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
  const options: ExpressRoutePortsLocationsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
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
