// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an Extension Type installable to the cluster based region and type for the cluster.
 *
 * @summary Get an Extension Type installable to the cluster based region and type for the cluster.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionType.json
 */

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getExtensionTypes(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "my-cluster";
  const extensionTypeName = "my-extension-type";
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.get(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionTypeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExtensionTypes();
}

main().catch(console.error);
