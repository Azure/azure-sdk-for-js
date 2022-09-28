// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworksCheckIPAddressAvailabilityParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Checks whether a private IP address is available for use.
 *
 * @summary Checks whether a private IP address is available for use.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCheckIPAddressAvailability.json
 */
async function checkIPAddressAvailability() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCheckIPAddressAvailabilityParameters = {
    queryParameters: { ipAddress: "10.0.1.4", "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/CheckIPAddressAvailability",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName
    )
    .get(options);
  console.log(result);
}

checkIPAddressAvailability().catch(console.error);
