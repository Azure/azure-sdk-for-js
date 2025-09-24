// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get properties of the provided Kubernetes cluster agent pool.
 *
 * @summary Get properties of the provided Kubernetes cluster agent pool.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/AgentPools_Get.json
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getKubernetesClusterAgentPool(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const kubernetesClusterName = "kubernetesClusterName";
  const agentPoolName = "agentPoolName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.agentPools.get(
    resourceGroupName,
    kubernetesClusterName,
    agentPoolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getKubernetesClusterAgentPool();
}

main().catch(console.error);
