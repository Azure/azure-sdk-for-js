// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to contains Safeguards version along with its support info and whether it is a default version.
 *
 * @summary contains Safeguards version along with its support info and whether it is a default version.
 * x-ms-original-file: 2025-10-02-preview/GetSafeguardsVersions.json
 */
async function getSafeguardsAvailableVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getSafeguardsVersions("location1", "v1.0.0");
  console.log(result);
}

async function main() {
  await getSafeguardsAvailableVersions();
}

main().catch(console.error);
