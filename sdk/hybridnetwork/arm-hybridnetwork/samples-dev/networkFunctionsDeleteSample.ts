// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified network function resource.
 *
 * @summary Deletes the specified network function resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkFunctionDelete.json
 */
async function deleteNetworkFunctionResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const networkFunctionName = "testNf";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctions.beginDeleteAndWait(
    resourceGroupName,
    networkFunctionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the specified network function resource.
 *
 * @summary Deletes the specified network function resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/AzureCore/VirtualNetworkFunctionDelete.json
 */
async function deleteVirtualNetworkFunctionResourceOnAzureCore(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const networkFunctionName = "testNf";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctions.beginDeleteAndWait(
    resourceGroupName,
    networkFunctionName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes the specified network function resource.
 *
 * @summary Deletes the specified network function resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/AzureOperatorNexus/VirtualNetworkFunctionDelete.json
 */
async function deleteVirtualNetworkFunctionResourceOnAzureOperatorNexus(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const networkFunctionName = "testNf";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctions.beginDeleteAndWait(
    resourceGroupName,
    networkFunctionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteNetworkFunctionResource();
  await deleteVirtualNetworkFunctionResourceOnAzureCore();
  await deleteVirtualNetworkFunctionResourceOnAzureOperatorNexus();
}

main().catch(console.error);
