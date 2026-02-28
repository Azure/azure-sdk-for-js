// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this action cannot be performed on a cluster that is not using a service principal
 *
 * @summary this action cannot be performed on a cluster that is not using a service principal
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersResetServicePrincipalProfile.json
 */
async function resetServicePrincipalProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.resetServicePrincipalProfile("rg1", "clustername1", {
    clientId: "clientid",
    secret: "secret",
  });
}

async function main() {
  await resetServicePrincipalProfile();
}

main().catch(console.error);
