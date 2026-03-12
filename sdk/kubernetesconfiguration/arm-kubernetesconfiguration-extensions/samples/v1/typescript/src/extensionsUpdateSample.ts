// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch an existing Kubernetes Cluster Extension.
 *
 * @summary patch an existing Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/PatchExtension.json
 */
async function updateExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.extensions.update(
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
      releaseTrain: "Preview",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateExtension();
}

main().catch(console.error);
