// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the version for an Extension Type installable to the cluster.
 *
 * @summary List the version for an Extension Type installable to the cluster.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypeVersions.json
 */

import {
  ExtensionTypesClusterListVersionsOptionalParams,
  ExtensionTypesClient,
} from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExtensionTypeVersions(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "my-cluster";
  const extensionTypeName = "my-extension-type";
  const releaseTrain = "stable";
  const majorVersion = "2";
  const showLatest = true;
  const options: ExtensionTypesClusterListVersionsOptionalParams = {
    releaseTrain,
    majorVersion,
    showLatest,
  };
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.listClusterListVersions(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionTypeName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
