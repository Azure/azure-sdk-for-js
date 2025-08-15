// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified network function definition version.
 *
 * @summary Deletes the specified network function definition version.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkFunctionDefinitionVersionDelete.json
 */
async function deleteANetworkFunctionDefinitionVersion(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkFunctionDefinitionGroupName = "TestNetworkFunctionDefinitionGroupName";
  const networkFunctionDefinitionVersionName = "1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctionDefinitionVersions.beginDeleteAndWait(
    resourceGroupName,
    publisherName,
    networkFunctionDefinitionGroupName,
    networkFunctionDefinitionVersionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the specified network function definition version.
 *
 * @summary Deletes the specified network function definition version.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/AzureCore/VirtualNetworkFunctionDefinitionVersionDelete.json
 */
async function deleteANetworkFunctionDefinitionVersionForAzureCoreVnf(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkFunctionDefinitionGroupName = "TestNetworkFunctionDefinitionGroupName";
  const networkFunctionDefinitionVersionName = "1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctionDefinitionVersions.beginDeleteAndWait(
    resourceGroupName,
    publisherName,
    networkFunctionDefinitionGroupName,
    networkFunctionDefinitionVersionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the specified network function definition version.
 *
 * @summary Deletes the specified network function definition version.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/AzureOperatorNexus/VirtualNetworkFunctionDefinitionVersionDelete.json
 */
async function deleteANetworkFunctionDefinitionVersionForAzureOperatorNexusVnf(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const networkFunctionDefinitionGroupName = "TestNetworkFunctionDefinitionGroupName";
  const networkFunctionDefinitionVersionName = "1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctionDefinitionVersions.beginDeleteAndWait(
    resourceGroupName,
    publisherName,
    networkFunctionDefinitionGroupName,
    networkFunctionDefinitionVersionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteANetworkFunctionDefinitionVersion();
  await deleteANetworkFunctionDefinitionVersionForAzureCoreVnf();
  await deleteANetworkFunctionDefinitionVersionForAzureOperatorNexusVnf();
}

main().catch(console.error);
