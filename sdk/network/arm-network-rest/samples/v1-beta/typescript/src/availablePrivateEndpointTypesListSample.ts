// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  AvailablePrivateEndpointTypesListParameters,
  paginate
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region.
 *
 * @summary Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AvailablePrivateEndpointTypesGet.json
 */
async function getAvailablePrivateEndpointTypes() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "regionName";
  const options: AvailablePrivateEndpointTypesListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/availablePrivateEndpointTypes",
      subscriptionId,
      location
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getAvailablePrivateEndpointTypes().catch(console.error);
