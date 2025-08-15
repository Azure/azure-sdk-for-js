// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about the specified networkServiceDesign group.
 *
 * @summary Gets information about the specified networkServiceDesign group.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkServiceDesignGroupGet.json
 */
async function getANetworkServiceDesignGroupResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkServiceDesignGroupName = "TestNetworkServiceDesignGroupName";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkServiceDesignGroups.get(
    resourceGroupName,
    publisherName,
    networkServiceDesignGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getANetworkServiceDesignGroupResource();
}

main().catch(console.error);
