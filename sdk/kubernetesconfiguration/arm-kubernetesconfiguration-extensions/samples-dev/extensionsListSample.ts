// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Extensions in the cluster.
 *
 * @summary List all Extensions in the cluster.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensions/stable/2024-11-01/examples/ListExtensions.json
 */

import { ExtensionsClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExtensions(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "clusterName1";
  const credential = new DefaultAzureCredential();
  const client = new ExtensionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensions.list(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensions();
}

main().catch(console.error);
