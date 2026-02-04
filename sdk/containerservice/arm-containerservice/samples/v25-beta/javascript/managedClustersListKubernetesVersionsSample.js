// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version
 *
 * @summary contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version
 * x-ms-original-file: 2025-10-02-preview/KubernetesVersions_List.json
 */
async function listKubernetesVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.listKubernetesVersions("location1");
  console.log(result);
}

async function main() {
  await listKubernetesVersions();
}

main().catch(console.error);
