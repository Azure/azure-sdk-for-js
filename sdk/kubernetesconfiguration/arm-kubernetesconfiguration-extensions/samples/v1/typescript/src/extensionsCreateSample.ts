// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionsClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Kubernetes Cluster Extension.
 *
 * @summary create a new Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/CreateExtension.json
 */
async function createExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.create(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "ClusterMonitor",
    {
      extensionType: "azuremonitor-containers",
      autoUpgradeMode: "compatible",
      autoUpgradeMinorVersion: true,
      releaseTrain: "Preview",
      scope: { cluster: { releaseNamespace: "kube-system" } },
      configurationSettings: {
        "omsagent.secret.wsid": "fakeTokenPlaceholder",
        "omsagent.env.clusterName": "clusterName1",
      },
      configurationProtectedSettings: { "omsagent.secret.key": "secretKeyValue01" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes Cluster Extension.
 *
 * @summary create a new Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/CreateExtensionWithPlan.json
 */
async function createExtensionWithPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.create(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "azureVote",
    {
      extensionType: "azure-vote",
      autoUpgradeMode: "compatible",
      autoUpgradeMinorVersion: true,
      releaseTrain: "Preview",
      plan: {
        name: "azure-vote-standard",
        publisher: "Microsoft",
        product: "azure-vote-standard-offer-id",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExtension();
  await createExtensionWithPlan();
}

main().catch(console.error);
