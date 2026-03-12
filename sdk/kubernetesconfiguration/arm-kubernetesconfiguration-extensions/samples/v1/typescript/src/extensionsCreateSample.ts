// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Kubernetes Cluster Extension.
 *
 * @summary create a new Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/CreateExtension.json
 */
async function createExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.extensions.create(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "ClusterMonitor",
    {
      autoUpgradeMinorVersion: true,
      configurationProtectedSettings: { "omsagent.secret.key": "secretKeyValue01" },
      configurationSettings: {
        "omsagent.env.clusterName": "clusterName1",
        "omsagent.secret.wsid": "fakeTokenPlaceholder",
      },
      extensionType: "azuremonitor-containers",
      releaseTrain: "Preview",
      scope: { cluster: { releaseNamespace: "kube-system" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes Cluster Extension.
 *
 * @summary create a new Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/CreateExtensionWithPlan.json
 */
async function createExtensionWithPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.extensions.create(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "azureVote",
    {
      plan: {
        name: "azure-vote-standard",
        product: "azure-vote-standard-offer-id",
        publisher: "Microsoft",
      },
      autoUpgradeMinorVersion: true,
      extensionType: "azure-vote",
      releaseTrain: "Preview",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExtension();
  await createExtensionWithPlan();
}

main().catch(console.error);
