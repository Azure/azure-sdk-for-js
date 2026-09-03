// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  FluxConfigurationClient,
} = require("@azure/arm-kubernetesconfiguration-fluxconfigurations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing Kubernetes Flux Configuration.
 *
 * @summary update an existing Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/PatchFluxConfiguration.json
 */
async function patchFluxConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new FluxConfigurationClient(credential, subscriptionId);
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
          dependsOn: [],
          syncIntervalInSeconds: 300,
        },
        "srs-kustomization3": { path: "./test/another-path", syncIntervalInSeconds: 300 },
      },
      suspend: true,
    },
  );
  console.log(result);
}

async function main() {
  await patchFluxConfiguration();
}

main().catch(console.error);
