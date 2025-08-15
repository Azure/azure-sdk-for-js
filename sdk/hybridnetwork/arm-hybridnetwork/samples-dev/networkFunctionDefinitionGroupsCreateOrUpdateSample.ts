// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkFunctionDefinitionGroup } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a network function definition group.
 *
 * @summary Creates or updates a network function definition group.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkFunctionDefinitionGroupCreate.json
 */
async function createOrUpdateTheNetworkFunctionDefinitionGroup(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkFunctionDefinitionGroupName = "TestNetworkFunctionDefinitionGroupName";
  const parameters: NetworkFunctionDefinitionGroup = { location: "eastus" };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctionDefinitionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publisherName,
    networkFunctionDefinitionGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTheNetworkFunctionDefinitionGroup();
}

main().catch(console.error);
