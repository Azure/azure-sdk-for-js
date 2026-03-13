// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details of the Flux Configuration.
 *
 * @summary gets details of the Flux Configuration.
 * x-ms-original-file: 2025-04-01/GetFluxConfiguration.json
 */
async function getFluxConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFluxConfiguration();
}

main().catch(console.error);
