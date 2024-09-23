// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkProfilesGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the specified network profile in a specified resource group.
 *
 * @summary Gets the specified network profile in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkProfileGetConfigOnly.json
 */
async function getNetworkProfile() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkProfileName = "networkProfile1";
  const options: NetworkProfilesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkProfiles/{networkProfileName}",
      subscriptionId,
      resourceGroupName,
      networkProfileName,
    )
    .get(options);
  console.log(result);
}

getNetworkProfile().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified network profile in a specified resource group.
 *
 * @summary Gets the specified network profile in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkProfileGetWithContainerNic.json
 */
async function getNetworkProfileWithContainerNetworkInterfaces() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkProfileName = "networkProfile1";
  const options: NetworkProfilesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkProfiles/{networkProfileName}",
      subscriptionId,
      resourceGroupName,
      networkProfileName,
    )
    .get(options);
  console.log(result);
}

getNetworkProfileWithContainerNetworkInterfaces().catch(console.error);
