// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about the specified networkFunctionDefinition group.
 *
 * @summary Gets information about the specified networkFunctionDefinition group.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkFunctionDefinitionGroupGet.json
 */
async function getANetworkFunctionDefinitionGroupResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkFunctionDefinitionGroupName = "TestNetworkFunctionDefinitionGroupName";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctionDefinitionGroups.get(
    resourceGroupName,
    publisherName,
    networkFunctionDefinitionGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getANetworkFunctionDefinitionGroupResource();
}

main().catch(console.error);
