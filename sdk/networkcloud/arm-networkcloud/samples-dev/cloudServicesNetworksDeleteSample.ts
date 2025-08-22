// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the provided cloud services network.
 *
 * @summary Delete the provided cloud services network.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/CloudServicesNetworks_Delete.json
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteCloudServicesNetwork(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const cloudServicesNetworkName = "cloudServicesNetworkName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.cloudServicesNetworks.beginDeleteAndWait(
    resourceGroupName,
    cloudServicesNetworkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCloudServicesNetwork();
}

main().catch(console.error);
