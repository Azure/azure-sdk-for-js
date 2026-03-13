// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo.
 *
 * @summary this will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo.
 * x-ms-original-file: 2025-04-01/DeleteFluxConfiguration.json
 */
async function deleteFluxConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  await client.fluxConfigurations.delete(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
  );
}

async function main(): Promise<void> {
  await deleteFluxConfiguration();
}

main().catch(console.error);
