// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  FluxConfigurationClient,
} = require("@azure/arm-kubernetesconfiguration-fluxconfigurations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details of the Flux Configuration.
 *
 * @summary gets details of the Flux Configuration.
 * x-ms-original-file: 2025-04-01/GetFluxConfiguration.json
 */
async function getFluxConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new FluxConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
  );
  console.log(result);
}

async function main() {
  await getFluxConfiguration();
}

main().catch(console.error);
