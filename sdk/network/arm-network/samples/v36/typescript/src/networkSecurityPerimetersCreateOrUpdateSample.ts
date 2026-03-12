// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NetworkSecurityPerimeter} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Network Security Perimeter.
 *
 * @summary Creates or updates a Network Security Perimeter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkSecurityPerimeterPut.json
 */
async function putNetworkSecurityPerimeter(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const parameters: NetworkSecurityPerimeter = { location: "location1" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.createOrUpdate(
    resourceGroupName,
    networkSecurityPerimeterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putNetworkSecurityPerimeter();
}

main().catch(console.error);
