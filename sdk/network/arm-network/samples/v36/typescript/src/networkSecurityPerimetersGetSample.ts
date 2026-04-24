// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified network security perimeter by the name.
 *
 * @summary Gets the specified network security perimeter by the name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkSecurityPerimeterGet.json
 */
async function networkSecurityPerimeterGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.get(
    resourceGroupName,
    networkSecurityPerimeterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterGet();
}

main().catch(console.error);
