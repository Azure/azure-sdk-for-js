// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PublicIPPrefixesCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a static or dynamic public IP prefix.
 *
 * @summary Creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PublicIpPrefixCreateCustomizedValues.json
 */
async function createPublicIPPrefixAllocationMethod() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const options: PublicIPPrefixesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: { prefixLength: 30, publicIPAddressVersion: "IPv4" },
      sku: { name: "Standard", tier: "Regional" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIpPrefixName}",
      subscriptionId,
      resourceGroupName,
      publicIpPrefixName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPublicIPPrefixAllocationMethod().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a static or dynamic public IP prefix.
 *
 * @summary Creates or updates a static or dynamic public IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PublicIpPrefixCreateDefaults.json
 */
async function createPublicIPPrefixDefaults() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const options: PublicIPPrefixesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: { prefixLength: 30 },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIpPrefixName}",
      subscriptionId,
      resourceGroupName,
      publicIpPrefixName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPublicIPPrefixDefaults().catch(console.error);
