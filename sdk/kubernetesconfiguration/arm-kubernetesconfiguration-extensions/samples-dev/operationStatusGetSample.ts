// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get Async Operation status
 *
 * @summary Get Async Operation status
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensions/stable/2024-11-01/examples/GetExtensionAsyncOperationStatus.json
 */

import { ExtensionsClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function extensionAsyncOperationStatusGet(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "clusterName1";
  const extensionName = "ClusterMonitor";
  const operationId = "99999999-9999-9999-9999-999999999999";
  const credential = new DefaultAzureCredential();
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await extensionAsyncOperationStatusGet();
}

main().catch(console.error);
