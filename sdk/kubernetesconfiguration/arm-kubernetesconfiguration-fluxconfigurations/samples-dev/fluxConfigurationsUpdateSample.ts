// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing Kubernetes Flux Configuration.
 *
 * @summary update an existing Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/PatchFluxConfiguration.json
 */
async function patchFluxConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.update(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    {
      gitRepository: { url: "https://github.com/jonathan-innis/flux2-kustomize-helm-example.git" },
      kustomizations: {
        "srs-kustomization2": {
          path: "./test/alt-path",
          dependsOn: null,
          syncIntervalInSeconds: 300,
        },
        "srs-kustomization3": { path: "./test/another-path", syncIntervalInSeconds: 300 },
      },
      suspend: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchFluxConfiguration();
}

main().catch(console.error);
