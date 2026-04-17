// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionsClient } = require("@azure/arm-kubernetesconfiguration-extensions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch an existing Kubernetes Cluster Extension.
 *
 * @summary patch an existing Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/PatchExtension.json
 */
async function updateExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.update(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "ClusterMonitor",
    {
      autoUpgradeMode: "compatible",
      autoUpgradeMinorVersion: true,
      releaseTrain: "Preview",
      configurationSettings: {
        "omsagent.secret.wsid": "fakeTokenPlaceholder",
        "omsagent.env.clusterName": "clusterName1",
      },
      configurationProtectedSettings: { "omsagent.secret.key": "secretKeyValue01" },
    },
  );
  console.log(result);
}

async function main() {
  await updateExtension();
}

main().catch(console.error);
