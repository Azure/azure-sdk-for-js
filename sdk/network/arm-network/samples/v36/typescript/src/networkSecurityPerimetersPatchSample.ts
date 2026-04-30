// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateTagsRequest} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patch Tags for a Network Security Perimeter.
 *
 * @summary Patch Tags for a Network Security Perimeter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkSecurityPerimeterPatch.json
 */
async function patchNetworkSecurityPerimeter(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const parameters: UpdateTagsRequest = { tags: { description: "nsp1" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.patch(
    resourceGroupName,
    networkSecurityPerimeterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchNetworkSecurityPerimeter();
}

main().catch(console.error);
