// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FluxConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Flux Configurations.
 *
 * @summary list all Flux Configurations.
 * x-ms-original-file: 2025-04-01/ListFluxConfigurations.json
 */
async function listFluxConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new FluxConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fluxConfigurations.list(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFluxConfiguration();
}

main().catch(console.error);
