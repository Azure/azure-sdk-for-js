// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restart a targeted node of a Kubernetes cluster.
 *
 * @summary Restart a targeted node of a Kubernetes cluster.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/KubernetesClusters_RestartNode.json
 */

import {
  KubernetesClusterRestartNodeParameters,
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function restartAKubernetesClusterNode(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const kubernetesClusterName = "kubernetesClusterName";
  const kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters =
    { nodeName: "nodeName" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusters.beginRestartNodeAndWait(
    resourceGroupName,
    kubernetesClusterName,
    kubernetesClusterRestartNodeParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartAKubernetesClusterNode();
}

main().catch(console.error);
