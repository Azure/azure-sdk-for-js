// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a replica with the specified parameters.
 *
 * @summary creates a replica with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateReplica.json
 */
async function replicasCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.replicas.create("myResourceGroup", "contoso", "myReplicaEus", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await replicasCreate();
}

main().catch(console.error);
