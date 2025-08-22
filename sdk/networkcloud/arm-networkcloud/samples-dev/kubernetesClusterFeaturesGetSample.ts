// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get properties of the provided the Kubernetes cluster feature.
 *
 * @summary Get properties of the provided the Kubernetes cluster feature.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/KubernetesClusterFeatures_Get.json
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getKubernetesClusterFeature(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const kubernetesClusterName = "kubernetesClusterName";
  const featureName = "featureName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusterFeatures.get(
    resourceGroupName,
    kubernetesClusterName,
    featureName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getKubernetesClusterFeature();
}

main().catch(console.error);
