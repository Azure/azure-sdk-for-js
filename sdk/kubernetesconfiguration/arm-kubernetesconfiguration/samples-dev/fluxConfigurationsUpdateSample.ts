// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FluxConfigurationPatch } from "@azure/arm-kubernetesconfiguration";
import { SourceControlConfigurationClient } from "@azure/arm-kubernetesconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update an existing Kubernetes Flux Configuration.
 *
 * @summary Update an existing Kubernetes Flux Configuration.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2023-05-01/examples/PatchFluxConfiguration.json
 */
async function patchFluxConfiguration(): Promise<void> {
  const subscriptionId = process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const resourceGroupName = process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "rg1";
  const clusterRp = "Microsoft.Kubernetes";
  const clusterResourceName = "connectedClusters";
  const clusterName = "clusterName1";
  const fluxConfigurationName = "srs-fluxconfig";
  const fluxConfigurationPatch: FluxConfigurationPatch = {
    gitRepository: {
      url: "https://github.com/jonathan-innis/flux2-kustomize-helm-example.git",
    },
    kustomizations: {
      srsKustomization1: {},
      srsKustomization2: {
        path: "./test/alt-path",
        dependsOn: [],
        syncIntervalInSeconds: 300,
      },
      srsKustomization3: {
        path: "./test/another-path",
        syncIntervalInSeconds: 300,
      },
    },
    suspend: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SourceControlConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.beginUpdateAndWait(
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    fluxConfigurationName,
    fluxConfigurationPatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchFluxConfiguration();
}

main().catch(console.error);
