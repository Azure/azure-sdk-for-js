// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  FluxConfigurationClient,
} = require("@azure/arm-kubernetesconfiguration-fluxconfigurations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Flux Configurations.
 *
 * @summary list all Flux Configurations.
 * x-ms-original-file: 2025-04-01/ListFluxConfigurations.json
 */
async function listFluxConfiguration() {
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

async function main() {
  await listFluxConfiguration();
}

main().catch(console.error);
