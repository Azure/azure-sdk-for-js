// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a new Kubernetes Cluster Extension.
 *
 * @summary Create a new Kubernetes Cluster Extension.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensions/stable/2024-11-01/examples/CreateExtension.json
 */

import {
  Extension,
  ExtensionsClient,
} from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createExtension(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "clusterName1";
  const extensionName = "ClusterMonitor";
  const extension: Extension = {
    autoUpgradeMinorVersion: true,
    configurationProtectedSettings: { omsagentSecretKey: "secretKeyValue01" },
    configurationSettings: {
      omsagentEnvClusterName: "clusterName1",
      omsagentSecretWsid: "fakeTokenPlaceholder",
    },
    extensionType: "azuremonitor-containers",
    releaseTrain: "Preview",
    scope: { cluster: { releaseNamespace: "kube-system" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.beginCreateAndWait(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionName,
    extension,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a new Kubernetes Cluster Extension.
 *
 * @summary Create a new Kubernetes Cluster Extension.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensions/stable/2024-11-01/examples/CreateExtensionWithPlan.json
 */
async function createExtensionWithPlan(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "clusterName1";
  const extensionName = "azureVote";
  const extension: Extension = {
    autoUpgradeMinorVersion: true,
    extensionType: "azure-vote",
    plan: {
      name: "azure-vote-standard",
      product: "azure-vote-standard-offer-id",
      publisher: "Microsoft",
    },
    releaseTrain: "Preview",
  };
  const credential = new DefaultAzureCredential();
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.beginCreateAndWait(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionName,
    extension,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExtension();
  await createExtensionWithPlan();
}

main().catch(console.error);
