// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Post to List of Network Manager Deployment Status.
 *
 * @summary Post to List of Network Manager Deployment Status.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkManagerDeploymentStatusList.json
 */

import type {
  NetworkManagerDeploymentStatusParameter} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkManagerDeploymentStatusList(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "resoureGroupSample";
  const networkManagerName = "testNetworkManager";
  const parameters: NetworkManagerDeploymentStatusParameter = {
    deploymentTypes: ["Connectivity", "AdminPolicy"],
    regions: ["eastus", "westus"],
    skipToken: "FakeSkipTokenCode",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagerDeploymentStatusOperations.list(
    resourceGroupName,
    networkManagerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkManagerDeploymentStatusList();
}

main().catch(console.error);
